import React from 'react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { FeedbackSummary } from '../../types';
import { CheckCircle2, Clock, AlertCircle } from 'lucide-react';

interface FeedbackStatsProps {
  feedbackSummary: FeedbackSummary;
}

export const FeedbackStats: React.FC<FeedbackStatsProps> = ({ feedbackSummary }) => {
  const getScoreColorClass = (score: number): string => {
    if (score >= 4.5) return 'text-emerald-600';
    if (score >= 3.5) return 'text-primary-600';
    if (score >= 2.5) return 'text-amber-600';
    return 'text-red-600';
  };
  
  return (
    <Card>
      <CardHeader className="pb-0">
        <h3 className="text-lg font-medium text-gray-900">Your Feedback Summary</h3>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Overall Score */}
          <div className="p-4 border border-gray-100 rounded-lg bg-gray-50">
            <div className="flex flex-col items-center">
              <span className="text-sm font-medium text-gray-500">Overall Score</span>
              <span className={`text-3xl font-bold mt-2 ${getScoreColorClass(feedbackSummary.overallScore)}`}>
                {feedbackSummary.overallScore.toFixed(1)}/5
              </span>
              <span className="text-xs text-gray-500 mt-1">From {feedbackSummary.reviewCount} reviews</span>
            </div>
          </div>
          
          {/* Strengths */}
          <div className="p-4 border border-gray-100 rounded-lg bg-gray-50">
            <div className="flex items-center mb-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-500 mr-2" />
              <span className="text-sm font-medium text-gray-700">Key Strengths</span>
            </div>
            <ul className="text-xs text-gray-600 space-y-1 mt-2">
              {feedbackSummary.strengths.map((strength, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 mr-2"></span>
                  {strength}
                </li>
              ))}
            </ul>
          </div>
          
          {/* Areas for Improvement */}
          <div className="p-4 border border-gray-100 rounded-lg bg-gray-50">
            <div className="flex items-center mb-2">
              <AlertCircle className="h-5 w-5 text-amber-500 mr-2" />
              <span className="text-sm font-medium text-gray-700">Growth Areas</span>
            </div>
            <ul className="text-xs text-gray-600 space-y-1 mt-2">
              {feedbackSummary.areasForImprovement.map((area, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 mr-2"></span>
                  {area}
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Category Scores */}
        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Category Scores</h4>
          <div className="space-y-3">
            {Object.entries(feedbackSummary.categoryScores).map(([category, score]) => (
              <div key={category}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-gray-600">{category}</span>
                  <span className={`text-xs font-medium ${getScoreColorClass(score)}`}>
                    {score.toFixed(1)}/5
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div
                    className={`h-1.5 rounded-full ${
                      score >= 4.5 ? 'bg-emerald-500' :
                      score >= 3.5 ? 'bg-primary-500' :
                      score >= 2.5 ? 'bg-amber-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${(score / 5) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};