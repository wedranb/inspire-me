import test from 'ava';
import sinon from 'sinon';
import getInspired from '.';

test.beforeEach(t => {
  t.context.log = console.log;

  console.log = sinon.spy();
});

test('Should print quote 🦄', async t => {
  const quote = await getInspired();

  t.true(console.log.calledOnce);
});
