import { calculateAge } from './helpers';

export const getBloodGroupData = (users) => {
  const bloodGroups = {
    'A+': 0, 'A-': 0, 'B+': 0, 'B-': 0,
    'AB+': 0, 'AB-': 0, 'O+': 0, 'O-': 0
  };

  users.forEach(user => {
    if (user.bloodGroup) {
      bloodGroups[user.bloodGroup]++;
    }
  });

  return Object.entries(bloodGroups)
    .filter(([_, count]) => count > 0)
    .map(([name, count]) => ({ name, count, fill: getBloodGroupColor(name) }));
};

export const getAgeGroupData = (users) => {
  const ageGroups = {
    '18-25': 0, '26-35': 0, '36-45': 0, '46-55': 0, '56+': 0
  };

  users.forEach(user => {
    const age = calculateAge(user.birthDate);
    if (age >= 18 && age <= 25) ageGroups['18-25']++;
    else if (age <= 35) ageGroups['26-35']++;
    else if (age <= 45) ageGroups['36-45']++;
    else if (age <= 55) ageGroups['46-55']++;
    else ageGroups['56+']++;
  });

  return Object.entries(ageGroups).map(([name, count]) => ({
    name,
    count,
    ageGroup: name
  }));
};

export const getGenderData = (users) => {
  const genderCount = users.reduce((acc, user) => {
    acc[user.gender || 'unknown'] = (acc[user.gender || 'unknown'] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(genderCount).map(([name, count]) => ({
    name,
    count,
    fill: name === 'male' ? '#3B82F6' : '#EC4899'
  }));
};

const getBloodGroupColor = (group) => {
  const colors = {
    'A+': '#EF4444', 'A-': '#F87171',
    'B+': '#10B981', 'B-': '#34D399',
    'AB+': '#3B82F6', 'AB-': '#60A5FA',
    'O+': '#F59E0B', 'O-': '#FBBF24'
  };
  return colors[group] || '#6B7280';
};