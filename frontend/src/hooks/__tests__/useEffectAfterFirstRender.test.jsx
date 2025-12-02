import React from 'react';
import { useEffectAfterFirstRender } from '../useEffectAfterFirstRender';
import { render } from '@testing-library/react';
import { expect, vi, describe, it } from 'vitest';

const TestComponent = ({ callback, run = false }) => {
  useEffectAfterFirstRender(() => {
    callback();
  }, [run]);
  return null;
};

const firstRun = () => {
  const cleanup = vi.fn();
  const cb = vi.fn(cleanup);
  const { rerender } = render(<TestComponent callback={cb} run />);

  expect(cb).not.toHaveBeenCalled();
  return { rerender, cb, cleanup };
};

describe('useEffectAfterFirstRender', () => {
  it('should call callback after first render and also perform cleanup', () => {
    const { cb, cleanup, rerender } = firstRun();

    // After
    rerender(<TestComponent callback={cb} />);
    rerender(<TestComponent callback={cb} run />);

    expect(cb).toHaveBeenCalledTimes(2);
    expect(cleanup).toHaveBeenCalledTimes(2);
  });

  it('should call callback after first render and also perform cleanup for multiple renders of same component', () => {
    const { cb: cb1, cleanup: cleanup1, rerender: rerender1 } = firstRun();
    const { cb: cb2, cleanup: cleanup2, rerender: rerender2 } = firstRun();
    const { cb: cb3, cleanup: cleanup3, rerender: rerender3 } = firstRun();

    // After
    rerender1(<TestComponent callback={cb1} />);
    rerender2(<TestComponent callback={cb2} />);
    rerender3(<TestComponent callback={cb3} />);

    expect(cb1).toHaveBeenCalledTimes(1);
    expect(cb2).toHaveBeenCalledTimes(1);
    expect(cb3).toHaveBeenCalledTimes(1);
    expect(cleanup1).toHaveBeenCalledTimes(1);
    expect(cleanup2).toHaveBeenCalledTimes(1);
    expect(cleanup3).toHaveBeenCalledTimes(1);
  });
});
