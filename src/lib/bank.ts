export const money = (amount: number) => new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(amount);
export const STORAGE_KEY = 'flex-bank-state-v1';
export type Transaction = { id: string; name: string; category: string; amount: number; date: string; icon: string; reference?: string };
export type Contact = { id: string; name: string; initials: string; tone: number };
export type BankState = {
  balance: number; frozen: boolean; contacts: Contact[]; transactions: Transaction[];
  salary: { employer: string; amount: number; schedule: string; next: string };
  controls: { online: boolean; contactless: boolean; cash: boolean };
};
export const initialState: BankState = {
  balance: 14250, frozen: false,
  contacts: [{ id: 'mum', name: 'Mum', initials: 'M', tone: 0 }, { id: 'sam', name: 'Sam', initials: 'S', tone: 1 }, { id: 'aisha', name: 'Aisha', initials: 'A', tone: 2 }, { id: 'josh', name: 'Josh', initials: 'J', tone: 3 }],
  salary: { employer: 'Studio North', amount: 2850, schedule: 'Monthly', next: '2026-11-28' },
  controls: { online: true, contactless: true, cash: true },
  transactions: [
    { id: 'pret', name: 'Pret A Manger', category: 'Eating out', amount: -6.45, date: '2026-11-15T09:41:00Z', icon: 'pret' },
    { id: 'tesco', name: 'Tesco Express', category: 'Groceries', amount: -24.80, date: '2026-11-15T08:23:00Z', icon: 'tesco' },
    { id: 'tfl', name: 'TfL Travel', category: 'Transport', amount: -4.90, date: '2026-11-14T18:32:00Z', icon: 'tfl' },
    { id: 'salary', name: 'Monthly Salary', category: 'Income', amount: 2850, date: '2026-11-14T09:00:00Z', icon: 'salary' },
    { id: 'spotify', name: 'Spotify', category: 'Subscriptions', amount: -11.99, date: '2026-11-13T07:15:00Z', icon: 'spotify' },
    { id: 'sam', name: 'Sam', category: 'Transfers', amount: 25, date: '2026-11-13T12:30:00Z', icon: 'person', reference: 'Lunch yesterday' },
  ],
};
export function applyTransaction(state: BankState, amount: number, name: string, category: string, icon: string, reference?: string): BankState {
  if (!Number.isFinite(amount) || amount === 0) throw new Error('Enter an amount greater than £0.');
  const rounded = Math.round(amount * 100) / 100;
  if (rounded === 0) throw new Error('Enter an amount of at least £0.01.');
  if (state.balance + rounded < 0) throw new Error('Not enough money in your account.');
  if (category === 'Shopping' && state.frozen) throw new Error('Your card is frozen. Unfreeze it before paying.');
  if (category === 'Shopping' && !state.controls.online) throw new Error('Online payments are turned off. Enable them in card controls.');
  return { ...state, balance: Math.round((state.balance + rounded) * 100) / 100, transactions: [{ id: crypto.randomUUID(), name, category, amount: rounded, date: new Date().toISOString(), icon, reference }, ...state.transactions] };
}