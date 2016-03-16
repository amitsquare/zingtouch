/**
 * @file Binding.js
 * Tests Binding class
 */
import Input from './../../../src/core/classes/Input.js';
import ZingEvent from './../../../src/core/classes/ZingEvent.js';
/** @test {Input} */
describe('Input', function () {
  var event = document.createEvent('Event');
  var input = new Input(event, 1234);

  it('should be instantiated', function () {
    expect(Input).to.not.equal(null);
  });

  it('should have an initial event', function () {
    expect(input.initial).to.be.an.instanceof(ZingEvent);
  });

  it('should have an current event', function () {
    expect(input.current).to.be.an.instanceof(ZingEvent);
    expect(input.current).to.equal(input.current);
  });

  it('should have an previous event', function () {
    expect(input.previous).to.be.an.instanceof(ZingEvent);
    expect(input.previous).to.equal(input.current);
  });

});

/** @test {Input.update} */
describe('Input.update', function () {
  var event = document.createEvent('Event');
  var input = new Input(event, 1234);

  it('should update the current event', function () {
    var newEvent = document.createEvent('MouseEvent');
    input.update(newEvent, 4321);
    expect(input.previous).to.not.equal(input.current);
  });
});

/** @test {Input.getGestureProgress} */
describe('Input.getGestureProgress', function () {
  var event = document.createEvent('Event');
  var input = new Input(event, 1234);

  it('should have no progress initially', function () {
    expect(input.getGestureProgress('tap')).to.be.empty;
  });

  it('should have be able to store metadata in the progress object.', function () {
    expect(input.getGestureProgress('tap')).to.be.empty;
    (input.getGestureProgress('tap')).foo = 8;
    expect(input.getGestureProgress('tap').foo).to.equal(8);
  });
});

/** @test {Input.getCurrentEventType} */
describe('Input.getCurrentEventType', function () {

  it('should be null for an event it does not understand', function () {
    var event = document.createEvent('Event');
    var input = new Input(event, 1234);
    expect(input.getCurrentEventType()).to.be.null;
  });

  it('should not be null for an event it does understand', function () {
    var event = document.createEvent('TouchEvent');
    event.initUIEvent('touchstart', true, true);
    var touchInput = new Input(event, 1234);
    expect(touchInput.getCurrentEventType()).to.equal('start');
  });
});

/** @test {Input.getCurrentEventType} */
describe('Input.resetProgress', function () {
  var event = document.createEvent('Event');
  var input = new Input(event, 1234);
  it('should reset the progress of an existing progress state', function () {
    expect(input.getGestureProgress('tap')).to.be.empty;
    (input.getGestureProgress('tap')).foo = 8;
    expect(input.getGestureProgress('tap').foo).to.equal(8);
    input.resetProgress('tap');
    expect(input.getGestureProgress('tap')).to.be.empty;
  });
});
