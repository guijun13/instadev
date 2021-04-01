import { act, renderHook } from '@testing-library/react-hooks';
import useForm from './index';

describe('useForm()', () => {
  describe('when user types', () => {
    test('change the value', () => {
      const { result } = renderHook(() =>
        useForm({
          initialValues: {
            name: 'Jun',
          },
        })
      );
      const initialValues = { name: 'Jun' };
      expect(result.current.values).toEqual(initialValues);

      const event = {
        target: {
          getAttribute: () => 'name',
          value: 'Guilherme Jun',
        },
      };
      act(() => {
        result.current.handleChange(event);
      });

      expect(result.current.values).toEqual({ name: 'Guilherme Jun' });
    });
  });
});
