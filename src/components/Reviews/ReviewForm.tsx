import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { useReviews } from '../../context/ReviewContext';
import { useAppContext } from '../../context/AppContext';
import { Response } from '../../types';

const ReviewForm: React.FC<ReviewFormProps> = ({ review }) => {
  const { reviewId } = useParams<{ reviewId: string }>();
  const navigate = useNavigate();
  const { 
    getReviewById, 
    getCycleById, 
    getQuestionsForCycle,
    submitReview 
  } = useReviews();
  const { getUserById } = useAppContext();

  const [responses, setResponses] = useState<Response[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const reviewee = review ? getUserById(review.revieweeId) : undefined;
  const cycle = review ? getCycleById(review.cycleId) : undefined;
  const allQuestions = cycle ? getQuestionsForCycle(cycle.id) : [];
  
  // Filter questions based on review type
  const questions = allQuestions.filter(q => 
    !q.reviewType || q.reviewType === review?.reviewType
  );

  useEffect(() => {
    if (!review || review.status === 'completed') {
      navigate('/reviews-to-complete');
      return;
    }

    if (questions.length > 0 && responses.length === 0) {
      setResponses(
        questions.map(question => ({
          questionId: question.id,
          answer: '',
          rating: question.type === 'rating' ? 0 : undefined
        }))
      );
    }
  }, [review, questions, responses.length, navigate]);

  if (!review || !reviewee || !cycle) {
    return <div>Loading...</div>;
  }

  const handleTextChange = (questionId: string, value: string) => {
    setResponses(prev => 
      prev.map(response => 
        response.questionId === questionId 
          ? { ...response, answer: value } 
          : response
      )
    );
    
    if (errors[questionId]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[questionId];
        return newErrors;
      });
    }
  };

  const handleRatingChange = (questionId: string, rating: number) => {
    setResponses(prev => 
      prev.map(response => 
        response.questionId === questionId 
          ? { ...response, rating } 
          : response
      )
    );
    
    if (errors[questionId]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[questionId];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    questions.forEach(question => {
      if (question.required) {
        const response = responses.find(r => r.questionId === question.id);
        
        if (question.type === 'text' && (!response?.answer || response.answer.trim() === '')) {
          newErrors[question.id] = 'This field is required';
          isValid = false;
        }
        
        if (question.type === 'rating' && (!response?.rating || response.rating === 0)) {
          newErrors[question.id] = 'Please select a rating';
          isValid = false;
        }
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      submitReview(reviewId!, responses);
      navigate('/reviews-to-complete', { 
        state: { success: true, message: 'Review submitted successfully' } 
      });
    } catch (error) {
      console.error('Error submitting review:', error);
      setIsSubmitting(false);
    }
  };

  const getReviewTypeLabel = (reviewType: string) => {
    const types = {
      self: 'Self Review',
      peer: 'Peer Review',
      manager: 'Manager Review',
      subordinate: 'Direct Report Review'
    };
    return types[reviewType as keyof typeof types] || reviewType;
  };

  return (
    <div className="bg-white shadow-sm rounded-lg">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            <Avatar src={reviewee.avatar} name={reviewee.name} size="lg" />
            <div className="ml-4">
              <h2 className="text-xl font-semibold text-gray-900">{reviewee.name}</h2>
              <p className="mt-1 text-sm text-gray-500">
                {reviewee.role} • {reviewee.department}
              </p>
            </div>
            <Badge 
              text={getReviewTypeLabel(review.reviewType)} 
              variant="info"
              className="ml-4"
            />
          </div>
          <p className="text-sm text-gray-500">
            {cycle.name}
          </p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="border-t border-gray-200 mt-6 pt-6 space-y-8">
            {questions.map((question) => (
              <div key={question.id} className="space-y-2">
                <label className="block text-sm font-medium text-gray-900">
                  {question.text}
                  {question.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                
                {question.type === 'text' ? (
                  <div>
                    <textarea
                      rows={4}
                      className="shadow-sm block w-full sm:text-sm border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                      value={responses.find(r => r.questionId === question.id)?.answer || ''}
                      onChange={(e) => handleTextChange(question.id, e.target.value)}
                    />
                    {errors[question.id] && (
                      <p className="mt-1 text-sm text-red-500">{errors[question.id]}</p>
                    )}
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center space-x-2">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          type="button"
                          className={`h-10 w-10 rounded-full flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                            (responses.find(r => r.questionId === question.id)?.rating || 0) >= rating
                              ? 'bg-primary-600 text-white focus:ring-primary-500'
                              : 'bg-gray-100 text-gray-400 hover:bg-gray-200 focus:ring-gray-500'
                          }`}
                          onClick={() => handleRatingChange(question.id, rating)}
                        >
                          {rating}
                        </button>
                      ))}
                    </div>
                    {errors[question.id] && (
                      <p className="mt-1 text-sm text-red-500">{errors[question.id]}</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-8 border-t border-gray-200 pt-6">
            <div className="flex justify-end">
              <Button
                type="submit"
                variant="primary"
                disabled={isSubmitting}
                loading={isSubmitting}
                icon={<Save className="h-4 w-4" />}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Review'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;