import React from 'react';
import { useEffectOnceAfter } from '../useEffectOnceAfter';
import { render } from '@testing-library/react';
import { expect, vi, describe, it } from 'vitest';

const TestComponent = ({ callback, afterCallback, run = false }) => {
  useEffectOnceAfter(
    () => callback(),
    () => afterCallback(),
    [run]
  );

  return null;
};

const firstRun = () => {
  const cleanup = vi.fn();
  const cb = vi.fn();
  const cbAfter = vi.fn(cleanup);

  const { rerender } = render(
    <TestComponent callback={cb} afterCallback={cbAfter} run />
  );

  expect(cb).toHaveBeenCalledTimes(1);
  expect(cbAfter).not.toHaveBeenCalled();

  return { rerender, cb, cbAfter, cleanup };
};

describe('useEffectOnceAfter', () => {
  it('should call callback once after second callback and also perform cleanup', () => {
    const { cb, cbAfter, cleanup, rerender } = firstRun();

    // After
    rerender(<TestComponent callback={cb} afterCallback={cbAfter} />);
    rerender(<TestComponent callback={cb} afterCallback={cbAfter} run />);

    expect(cb).toHaveBeenCalledTimes(1);
    expect(cbAfter).toHaveBeenCalledTimes(2);
    expect(cleanup).toHaveBeenCalledTimes(2);
  });

  it('should call callback once after second callback and also perform cleanup for multiple renders of same component', () => {
    const {
      cb: cb1,
      cbAfter: cbAfter1,
      cleanup: cleanup1,
      rerender: rerender1,
    } = firstRun();
    const {
      cb: cb2,
      cbAfter: cbAfter2,
      cleanup: cleanup2,
      rerender: rerender2,
    } = firstRun();
    const {
      cb: cb3,
      cbAfter: cbAfter3,
      cleanup: cleanup3,
      rerender: rerender3,
    } = firstRun();

    // After
    rerender1(<TestComponent callback={cb1} afterCallback={cbAfter1} />);
    rerender2(<TestComponent callback={cb2} afterCallback={cbAfter2} />);
    rerender3(<TestComponent callback={cb3} afterCallback={cbAfter3} />);

    rerender1(<TestComponent callback={cb1} afterCallback={cbAfter1} run />);
    rerender2(<TestComponent callback={cb2} afterCallback={cbAfter2} run />);
    rerender3(<TestComponent callback={cb3} afterCallback={cbAfter3} run />);

    expect(cbAfter1).toHaveBeenCalledTimes(2);
    expect(cbAfter2).toHaveBeenCalledTimes(2);
    expect(cbAfter2).toHaveBeenCalledTimes(2);

    expect(cleanup1).toHaveBeenCalledTimes(2);
    expect(cleanup2).toHaveBeenCalledTimes(2);
    expect(cleanup3).toHaveBeenCalledTimes(2);
  });
});
