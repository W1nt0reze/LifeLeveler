export const categories = [
  { id: 'work', name: 'Работа', color: '#FF6B6B' },
  { id: 'study', name: 'Учеба', color: '#4ECDC4' },
  { id: 'home', name: 'Дом', color: '#FFD166' },
  { id: 'health', name: 'Здоровье', color: '#06D6A0' },
  { id: 'other', name: 'Другое', color: '#118AB2' }
];

export function getCategoryById(id) {
  return categories.find(category => category.id === id) ||
    { id: 'other', name: 'Другое', color: '#118AB2' };
}