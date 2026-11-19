import { describe, expect, it } from 'vitest';
import { applyTransaction, initialState, createGoal, fundGoal, buildStatement } from './bank';
describe('Flex Bank account rules', () => {
  it('starts with £14,250.00', () => expect(initialState.balance).toBe(14250));
  it('credits the £2,850 salary and records it', () => { const result = applyTransaction(initialState, 2850, 'Monthly Salary', 'Income', 'salary'); expect(result.balance).toBe(17100); expect(result.transactions[0]?.amount).toBe(2850); });
  it('deducts the exact checkout total', () => { const result = applyTransaction(initialState, -89.99, 'Nikey UK', 'Shopping', 'shop'); expect(result.balance).toBe(14160.01); expect(result.transactions[0]?.name).toBe('Nikey UK'); });
  it('blocks purchases while the card is frozen', () => expect(() => applyTransaction({ ...initialState, frozen: true }, -89.99, 'Nikey UK', 'Shopping', 'shop')).toThrow('frozen'));
  it('permits purchases after unfreezing', () => expect(applyTransaction({ ...initialState, frozen: false }, -100, 'Zarra', 'Shopping', 'shop').balance).toBe(14150));
  it('blocks overspending', () => expect(() => applyTransaction(initialState, -15000, 'Sam', 'Transfers', 'person')).toThrow('Not enough'));
  it('deducts outgoing transfers', () => expect(applyTransaction(initialState, -25, 'Mum', 'Transfers', 'person').balance).toBe(14225));
  it('credits incoming transfers', () => expect(applyTransaction(initialState, 25, 'Sam', 'Transfers', 'person').balance).toBe(14275));
  it('blocks online payments when disabled', () => expect(() => applyTransaction({ ...initialState, controls: { ...initialState.controls, online: false } }, -30, 'Zarra', 'Shopping', 'shop')).toThrow('turned off'));
});
describe('Savings and statements', () => {
  it('moves £50 from current account into savings without changing total funds', () => { const state = createGoal(initialState, 'Holiday', 500, '🌴'); const goal = state.goals[0]; if (!goal) throw new Error('Missing goal'); const result = fundGoal(state, goal.id, 50); expect(result.balance).toBe(14200); expect(result.goals[0]?.saved).toBe(50); expect(result.balance + (result.goals[0]?.saved ?? 0)).toBe(14250); });
  it('returns saved funds to the current account', () => { const state = { ...initialState, goals: [{ id: 'trip', name: 'Trip', target: 500, saved: 50, emoji: '🌴' }] }; const result = fundGoal(state, 'trip', 20, true); expect(result.balance).toBe(14270); expect(result.goals[0]?.saved).toBe(30); });
  it('rejects savings withdrawals beyond the goal balance', () => { const state = createGoal(initialState, 'Trip', 500, '🌴'); expect(() => fundGoal(state, state.goals[0]?.id ?? '', 20, true)).toThrow('Not enough'); });
  it('rejects funding beyond the current account balance', () => { const state = createGoal(initialState, 'Trip', 20000, '🌴'); expect(() => fundGoal(state, state.goals[0]?.id ?? '', 15000)).toThrow('Not enough'); });
  it('rejects a zero savings target', () => expect(() => createGoal(initialState, 'Trip', 0, '🌴')).toThrow('target'));
  it('reconciles the statement opening and closing balances including later transactions', () => { const state = { ...initialState, balance: 14500, transactions: [{ id: 'one', name: 'Salary', amount: 300, date: '2026-11-01', category: 'Income', icon: 'salary' }, { id: 'two', name: 'Shop', amount: -100, date: '2026-11-02', category: 'Shopping', icon: 'shop' }, { id: 'three', name: 'Topup', amount: 50, date: '2026-12-01', category: 'Income', icon: 'topup' }] }; const result = buildStatement(state, '2026-11'); expect(result.opening).toBe(14250); expect(result.closing).toBe(14450); expect(result.incoming).toBe(300); expect(result.outgoing).toBe(100); expect(result.rows).toHaveLength(2); });
});