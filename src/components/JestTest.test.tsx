import { render, waitFor, screen } from '@testing-library/react';
import JestTest from './JestTest';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import '@testing-library/jest-dom';

const mockData = [
  { userId: 1, id: 1, title: 'Title 1', body: 'Body 1' },
  { userId: 2, id: 2, title: 'Title 2', body: 'Body 2' },
];

describe('JestTest Component', () => {
  let axiosMock: MockAdapter;

  beforeEach(() => {
    axiosMock = new MockAdapter(axios);
  });

  afterEach(() => {
    axiosMock.restore();
  });

  it('renders loading message initially', async () => {
    axiosMock.onGet("https://jsonplaceholder.typicode.com/posts").reply(200, mockData);
    render(<JestTest />);

    expect(screen.getByText('loading .....</div>') ).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Title 1')).toBeInTheDocument();
      expect(screen.getByText('Title 2')).toBeInTheDocument();
    });
  });

  it('handles API call failure', async () => {
    axiosMock.onGet("https://jsonplaceholder.typicode.com/posts").reply(500, 'Internal Server Error');
    render(<JestTest />);

    expect(screen.getByText('loading .....</div>')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Error: Internal Server Error')).toBeInTheDocument();
    });
  });
});
