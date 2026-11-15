import { describe, expect, it } from 'vitest';
import { applyTransaction, initialState } from './bank';
describe('Flex Bank account rules', () => {
  it('starts with £14,250.00', () => expect(initialState.balance).toBe(14250));
  it('credits the £2,850 salary and records it', () => { const result = applyTransaction(initialState, 2850, 'Monthly Salary', 'Income', 'salary'); expect(result.balance).toBe(17100); expect(result.transactions[0].amount).toBe(2850); });
  it('deducts the exact checkout total', () => { const result = applyTransaction(initialState, -89.99, 'Nikey UK', 'Shopping', 'shop'); expect(result.balance).toBe(14160.01); expect(result.transactions[0].name).toBe('Nikey UK'); });
  it('blocks purchases while the card is frozen', () => expect(() => applyTransaction({ ...initialState, frozen: true }, -89.99, 'Nikey UK', 'Shopping', 'shop')).toThrow('frozen'));
  it('permits purchases after unfreezing', () => expect(applyTransaction({ ...initialState, frozen: false }, -100, 'Zarra', 'Shopping', 'shop').balance).toBe(14150));
  it('blocks overspending', () => expect(() => applyTransaction(initialState, -15000, 'Sam', 'Transfers', 'person')).toThrow('Not enough'));
  it('deducts outgoing transfers', () => expect(applyTransaction(initialState, -25, 'Mum', 'Transfers', 'person').balance).toBe(14225));
  it('credits incoming transfers', () => expect(applyTransaction(initialState, 25, 'Sam', 'Transfers', 'person').balance).toBe(14275));
  it('blocks online payments when disabled', () => expect(() => applyTransaction({ ...initialState, controls: { ...initialState.controls, online: false } }, -30, 'Zarra', 'Shopping', 'shop')).toThrow('turned off'));
});