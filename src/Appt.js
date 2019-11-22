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
xdescribe('App', () => {

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
    var promise = new Promise((resolve, reject) => {
      setTimeout(() => resolve({

        article:
        {
          title: 'Hic nihil quisquam est placeat aut molestiae cupiditate ut enim.',
          subTitle: 'Assumenda dolore hic ratione. Qui culpa reiciendis est esse et. Dolorem quibusdam quasi nobis praesentium fugit qui cupiditate tempora sed. Quam sit at aut mollitia quis. Officia sint qui. Maiores non nesciunt.',
          pic: 'http://lorempixel.com/640/480',
          createdAt: "2019 - 11 - 24T23: 31: 53.094Z",
          readingTime: 13,
          clapsNumber: 699,
          authorId: 3328,
          categoryId: 99
        },
        articleAuthor:
        {
          id: 3328,
          name: 'Salma Boehm',
          pic: 'https://s3.amazonaws.com/uifaces/faces/twitter/besbujupi/128.jpg',
          email: 'Marilie.Beer@hotmail.com',
          bio: 'Sapiente odit autem distinctio soluta et.',

        }
      }), 100);
      axios.get = jest.fn(() => promise);
      promise.then(() => {
        const wrapper = mount(<App farticle={res.data} />);
        expect(wrapper.find('li').length).toEqual(2);
        axios.get.mockClear();
        done();
      });

      const fArticleWrapper = wrapper.find(FeaturedArticle);
      expect(fArticleWrapper.find('h3').text()).toEqual('Featured stories')
    });
    // an integration test for fetching async data
    it('fetches async data', () => {
      var promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve({

          article:
          {
            title: 'Hic nihil quisquam est placeat aut molestiae cupiditate ut enim.',
            subTitle: 'Assumenda dolore hic ratione. Qui culpa reiciendis est esse et. Dolorem quibusdam quasi nobis praesentium fugit qui cupiditate tempora sed. Quam sit at aut mollitia quis. Officia sint qui. Maiores non nesciunt.',
            pic: 'http://lorempixel.com/640/480',
            createdAt: "2019 - 11 - 24T23: 31: 53.094Z",
            readingTime: 13,
            clapsNumber: 699,
            authorId: 3328,
            categoryId: 99
          },
          articleAuthor:
          {
            id: 3328,
            name: 'Salma Boehm',
            pic: 'https://s3.amazonaws.com/uifaces/faces/twitter/besbujupi/128.jpg',
            email: 'Marilie.Beer@hotmail.com',
            bio: 'Sapiente odit autem distinctio soluta et.',

          }
        }), 100);
      });
      axios.get = jest.fn(() => promise);

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
  // });
