import React from 'react';
import User from './user';
import renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';
import ReactTestUtils from 'react-test-utils';

describe('User Component', () => {
  test('should crash', () => {
    expect(() => renderer.create(<User />)).toThrow();
  });

  test('should render', () => {
    const user = {
      username: 'test',
      likes: 0
    };
    const renderer = new ShallowRenderer();
    renderer.render(<User user={user} />);
    const result = renderer.getRenderOutput();
    expect(result.type).toBe('li');
    const username = result.props.children[0];
    expect(username.type).toBe('p');
    expect(username.props.children[0]).toBe('Name: ');
    expect(username.props.children[1]).toBe(user.username);
    const likes = result.props.children[1];
    expect(likes.type).toBe('p');
    expect(likes.props.children[0]).toBe('Likes: ');
    expect(likes.props.children[1]).toBe(user.likes);
  });

  test('should render with action', () => {
    const user = {
      username: 'test',
      likes: 0,
      action: 'Like'
    };
    const renderer = new ShallowRenderer();
    renderer.render(<User user={user} />);
    const result = renderer.getRenderOutput();
    const action = result.props.children[2];
    expect(action.type).toBe('button');
    expect(action.props.children).toBe(user.action);
  });
});
