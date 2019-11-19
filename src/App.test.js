import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import App from './App';
import FeaturedArticle from "./components/FeaturedArticle";
import TopicList from "./components/topicList";

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
describe('App', () => {

  test('snapshot renders', () => {
    const component = renderer.create(<App />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders the inner FeaturedArticle', () => {
    const wrapper = mount(<App />);
    expect(wrapper.find(FeaturedArticle).length).toEqual(1);
  });
  it('renders the inner TopicList', () => {
    const wrapper = mount(<App />);
    expect(wrapper.find(TopicList).length).toEqual(1);
  });
  // integration test
  it('passes props to the featrued Article', () => {
    const wrapper = mount(<App />);
    const fArticleWrapper = wrapper.find(FeaturedArticle);
    expect(fArticleWrapper.find('h3').text()).toEqual('Featured stories')
  });
  // it('increments the counter', () => {
  //   const wrapper = mount(<App />);
  //   wrapper
  //     .find('button')
  //     .at(0)
  //     .simulate('click');
  //   const counterWrapper = wrapper.find(Counter);
  //   expect(counterWrapper.find('p').text()).toBe('1');
  // });
});
