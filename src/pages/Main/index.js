import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Form, SubmitButton, List } from './styles';
import Container from '../../components/Container';
import api from '../../services/api';

export default class Main extends Component {
  state = {
    newRepo: '',
    repositories: [],
    loading: false,
    error: null,
  };

  // pega info do local storage
  componentDidMount() {
    const repositories = localStorage.getItem('repos');
    if (repositories) {
      this.setState({ repositories: JSON.parse(repositories) });
    }
  }

  // salva quando atualiza estado
  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;

    if (prevState.repositories !== repositories)
      localStorage.setItem('repos', JSON.stringify(repositories));
  }

  handleInputChange = e => {
    this.setState({ newRepo: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();

    const { newRepo, repositories } = this.state;
    this.setState({ loading: true });
    try {
      if (newRepo === '') throw Error('Você precisa indicar um repositorio.'); // jogo erro pra dentro do catch

      const hasRepo = repositories.find(r => r.name === newRepo); // .find acha dentro do object

      if (hasRepo) throw Error('Repositório duplicado.');

      const response = await api.get(`/repos/${newRepo}`);
      const data = {
        name: response.data.full_name,
      };
      this.setState({
        repositories: [...repositories, data],
        newRepo: '',
        error: null,
      });
    } catch (err) {
      this.setState({
        newRepo: '',
        error: err,
      });
    } finally {
      this.setState({ loading: false }); // depois que fizer tudo para de carregar
    }
  };

  render() {
    const { newRepo, repositories, loading, error } = this.state;

    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositórios
        </h1>
        <Form onSubmit={this.handleSubmit} error={error}>
          <input
            type="text"
            placeholder="Adicionar repositório"
            value={newRepo}
            onChange={this.handleInputChange}
          />
          <SubmitButton loading={loading}>
            {!loading ? (
              <FaPlus color="#fff" size={14} />
            ) : (
              <FaSpinner color="#fff" size={14} />
            )}
          </SubmitButton>
        </Form>
        <List>
          {repositories.map(repository => (
            <li key={repository.name}>
              <span>{repository.name}</span>
              <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
                Detalhes
              </Link>
              {/* uso encodeURIComponent pra nao ser mais uma navegação '/' */}
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
