// Mock implementation of useUserContext
export const useUserContext = () => {
  return {
    user: {
      id: 'user123',
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'Engineer',
      department: 'Development',
      avatar: 'https://example.com/avatar.jpg',
    },
    competencies: {
      competencies: ['Communication', 'Teamwork', 'Problem Solving', 'Leadership'],
      scores: [80, 90, 70, 85],
    },
  };
};