import { User, ReviewCycle, ReviewTemplate, Review, FeedbackSummary } from '../types';
import { addDays } from 'date-fns';

export const users: User[] = [
  {
    id: 'u1',
    name: 'Alex Morgan',
    email: 'alex.morgan@company.com',
    role: 'Software Engineer',
    department: 'Engineering',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
    managerId: 'u2',
    relationships: [
      { userId: 'u2', relationshipType: 'manager' },
      { userId: 'u3', relationshipType: 'peer' },
      { userId: 'u4', relationshipType: 'subordinate' }
    ],
    competencyData: {
      competencies: ['Communication', 'Leadership', 'Problem Solving', 'Innovation', 'Teamwork'],
      scores: {
        self: [4, 3, 4, 5, 3],
        peer: [3.5, 3, 3.8, 4, 3.2],
        subordinate: [4.2, 4, 4.5, 4.1, 4.3],
        manager: [4, 4.5, 4, 4.2, 4]
      }
    }
  },
  {
    id: 'u2',
    name: 'Taylor Kim',
    email: 'taylor.kim@company.com',
    role: 'Engineering Manager',
    department: 'Engineering',
    managerId: 'u9',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
    relationships: [
      { userId: 'u1', relationshipType: 'subordinate' },
      { userId: 'u3', relationshipType: 'subordinate' }
    ],
    competencyData: {
      competencies: ['Communication', 'Leadership', 'Problem Solving', 'Innovation', 'Teamwork'],
      scores: {
        self: [4.5, 4, 4.2, 4.8, 4.1],
        peer: [4, 3.8, 4.1, 4.5, 4],
        subordinate: [4.7, 4.5, 4.8, 4.9, 4.6],
        manager: [4.8, 4.9, 4.7, 4.8, 4.9]
      }
    }
  },
  {
    id: 'u3',
    name: 'Jordan Smith',
    email: 'jordan.smith@company.com',
    role: 'Senior Developer',
    department: 'Engineering',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    managerId: 'u2',
    relationships: [
      { userId: 'u2', relationshipType: 'manager' },
      { userId: 'u1', relationshipType: 'peer' }
    ],
    competencyData: {
      competencies: ['Communication', 'Leadership', 'Problem Solving', 'Innovation', 'Teamwork'],
      scores: {
        self: [3.8, 3.5, 4, 4.2, 3.9],
        peer: [3.7, 3.6, 3.9, 4.1, 3.8],
        subordinate: [4.1, 4, 4.3, 4.4, 4.2],
        manager: [4.2, 4.3, 4.1, 4.5, 4.4]
      }
    }
  },
  {
    id: 'u4',
    name: 'Casey Johnson',
    email: 'casey.johnson@company.com',
    role: 'Junior Developer',
    department: 'Engineering',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    managerId: 'u1',
    relationships: [
      { userId: 'u1', relationshipType: 'manager' }
    ],
    competencyData: {
      competencies: ['Communication', 'Leadership', 'Problem Solving', 'Innovation', 'Teamwork'],
      scores: {
        self: [3.5, 3, 3.8, 4, 3.2],
        peer: [3.4, 3.2, 3.7, 3.9, 3.5],
        subordinate: [3.8, 3.7, 4, 4.1, 3.9],
        manager: [4, 4.1, 4.2, 4.3, 4.1]
      }
    }
  }
];

export const reviewCycles: ReviewCycle[] = [
  {
    id: 'c1',
    title: 'Q4 2024 Performance Review',
    description: 'End of year comprehensive review focused on yearly goals and achievements',
    startDate: new Date().toISOString(),
    endDate: addDays(new Date(), 30).toISOString(),
    status: 'active',
    templateId: 't1'
  },
  {
    id: 'c2',
    title: 'Management Effectiveness Survey',
    description: 'Mid-year leadership assessment focused on management skills',
    startDate: addDays(new Date(), -60).toISOString(),
    endDate: addDays(new Date(), -30).toISOString(),
    status: 'completed',
    templateId: 't2'
  },
  {
    id: 'c3',
    title: 'Project Success Review',
    description: 'Review focused on recent project completion and lessons learned',
    startDate: addDays(new Date(), 15).toISOString(),
    endDate: addDays(new Date(), 45).toISOString(),
    status: 'draft',
    templateId: 't1'
  }
];

export const reviewTemplates: ReviewTemplate[] = [
  {
    id: 't1',
    title: 'Standard Performance Review',
    description: 'Comprehensive review covering all performance aspects',
    sections: [
      {
        id: 's1',
        title: 'Technical Skills',
        description: 'Assessment of technical abilities and knowledge',
        questions: [
          {
            id: 'q1',
            text: 'How would you rate this person\'s technical expertise in their role?',
            type: 'rating',
            required: true,
            order: 1
          },
          {
            id: 'q2',
            text: 'What specific technical skills do you find impressive?',
            type: 'text',
            required: true,
            order: 2
          }
        ]
      },
      {
        id: 's2',
        title: 'Communication',
        description: 'Assessment of verbal and written communication skills',
        questions: [
          {
            id: 'q3',
            text: 'How effectively does this person communicate with team members?',
            type: 'rating',
            required: true,
            order: 1
          },
          {
            id: 'q4',
            text: 'How effectively does this person communicate with stakeholders?',
            type: 'rating',
            required: true,
            order: 2
          }
        ]
      },
      {
        id: 's3',
        title: 'Leadership',
        description: 'Assessment of leadership and influence',
        questions: [
          {
            id: 'q5',
            text: 'How would you rate this person\'s leadership abilities?',
            type: 'rating',
            required: true,
            order: 1
          },
          {
            id: 'q6',
            text: 'What suggestions do you have for this person to improve their leadership skills?',
            type: 'text',
            required: false,
            order: 2
          }
        ]
      }
    ]
  },
  {
    id: 't2',
    title: 'Management Effectiveness',
    description: 'Review focused on management and leadership skills',
    sections: [
      {
        id: 's4',
        title: 'Team Development',
        description: 'Ability to develop and grow team members',
        questions: [
          {
            id: 'q7',
            text: 'How effectively does this manager develop their team members?',
            type: 'rating',
            required: true,
            order: 1
          },
          {
            id: 'q8',
            text: 'What specific examples demonstrate their commitment to team growth?',
            type: 'text',
            required: true,
            order: 2
          }
        ]
      },
      {
        id: 's5',
        title: 'Strategic Thinking',
        description: 'Ability to think strategically and set direction',
        questions: [
          {
            id: 'q9',
            text: 'How would you rate this manager\'s strategic thinking abilities?',
            type: 'rating',
            required: true,
            order: 1
          },
          {
            id: 'q10',
            text: 'How clearly does this manager communicate strategic goals?',
            type: 'rating',
            required: true,
            order: 2
          }
        ]
      }
    ]
  }
];

export const reviews: Review[] = [
  {
    id: 'r1',
    cycleId: 'c1',
    reviewerId: 'u1',
    subjectId: 'u2',
    relationship: 'manager',
    status: 'pending',
    dueDate: addDays(new Date(), 15).toISOString(),
    responses: [],
    isAnonymous: false
  },
  {
    id: 'r2',
    cycleId: 'c1',
    reviewerId: 'u1',
    subjectId: 'u3',
    relationship: 'peer',
    status: 'in-progress',
    dueDate: addDays(new Date(), 15).toISOString(),
    responses: [
      {
        questionId: 'q1',
        value: 4
      },
      {
        questionId: 'q2',
        value: 'Jordan has excellent design systems knowledge and implementation skills.'
      }
    ],
    isAnonymous: true
  },
  {
    id: 'r3',
    cycleId: 'c1',
    reviewerId: 'u2',
    subjectId: 'u1',
    relationship: 'direct-report',
    status: 'completed',
    dueDate: addDays(new Date(), 15).toISOString(),
    submittedDate: addDays(new Date(), -2).toISOString(),
    responses: [
      {
        questionId: 'q1',
        value: 5
      },
      {
        questionId: 'q2',
        value: 'Alex is an excellent product manager with deep market knowledge.'
      },
      {
        questionId: 'q3',
        value: 5
      },
      {
        questionId: 'q4',
        value: 4
      },
      {
        questionId: 'q5',
        value: 5
      },
      {
        questionId: 'q6',
        value: 'Could delegate more complex tasks to the team.'
      }
    ],
    isAnonymous: false
  },
  {
    id: 'r4',
    cycleId: 'c1',
    reviewerId: 'u3',
    subjectId: 'u1',
    relationship: 'peer',
    status: 'completed',
    dueDate: addDays(new Date(), 15).toISOString(),
    submittedDate: addDays(new Date(), -5).toISOString(),
    responses: [
      {
        questionId: 'q1',
        value: 4
      },
      {
        questionId: 'q2',
        value: 'Strong product vision and roadmap planning.'
      },
      {
        questionId: 'q3',
        value: 5
      },
      {
        questionId: 'q4',
        value: 5
      },
      {
        questionId: 'q5',
        value: 4
      },
      {
        questionId: 'q6',
        value: 'Continue to involve design earlier in the product development process.'
      }
    ],
    isAnonymous: true
  },
  {
    id: 'r5',
    cycleId: 'c1',
    reviewerId: 'u1',
    subjectId: 'u1',
    relationship: 'self',
    status: 'in-progress',
    dueDate: addDays(new Date(), 15).toISOString(),
    responses: [
      {
        questionId: 'q1',
        value: 4
      },
      {
        questionId: 'q2',
        value: 'Product strategy and prioritization framework development.'
      }
    ],
    isAnonymous: false
  }
];

export const feedbackSummaries: FeedbackSummary[] = [
  {
    userId: 'u1',
    cycleId: 'c1',
    overallScore: 4.6,
    categoryScores: {
      'Technical Skills': 4.5,
      'Communication': 5.0,
      'Leadership': 4.3
    },
    strengths: [
      'Product strategy',
      'Stakeholder communication',
      'Market knowledge'
    ],
    areasForImprovement: [
      'Delegation',
      'Earlier design involvement'
    ],
    reviewCount: 3
  },
  {
    userId: 'u2',
    cycleId: 'c1',
    overallScore: 4.2,
    categoryScores: {
      'Technical Skills': 4.8,
      'Communication': 3.7,
      'Leadership': 4.0
    },
    strengths: [
      'Code quality',
      'Technical mentorship',
      'Problem solving'
    ],
    areasForImprovement: [
      'Cross-department communication',
      'Documentation'
    ],
    reviewCount: 4
  }
];