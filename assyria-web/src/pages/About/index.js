import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import DescriptionIcon from '@material-ui/icons/Description';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import Link from '@material-ui/core/Link';

import { Container, Content } from './styles';

function About({ pageName }) {
  useEffect(() => {
    document.title = 'About | Spatial Workspace';
  }, []);

  return (
    <Container>
      <Content>
        <Typography variant="h4" gutterBottom>
          {pageName}
        </Typography>

        <Typography paragraph align="justify">
          <strong>Spatial Workspace</strong> is an automated web platform for
          generating and organizing point and area spatial data from addresses
          (text). The platform allows the analysis of the fractal dimension of
          georeferenced data using the <i>Correlation Dimension</i> method and
          compatibility with Geographic Information Systems (GIS) for the
          construction of choropleth maps and other types of spatial analysis,
          such as kernel maps.
        </Typography>

        <Typography paragraph align="justify">
          This platform was initially developed to facilitate the organization
          of data and analysis of my doctoral thesis in the Graduate Program in
          Biometrics and Applied Statistics at the Federal Rural University of
          Pernambuco (UFRPE), located in Recife, capital of the state of
          Pernambuco, Brazil.
        </Typography>

        <Typography paragraph align="justify">
          However, I realized that she could go further, helping other people in
          their studies, analyzes and decision making. The entire system was
          designed to be dynamic and applicable to other contexts. My study
          context was in the health area. The thesis, as well as the system,
          were developed in the period from 2018 to 2022.
        </Typography>

        <Typography paragraph id="develop-by-text">
          By: <strong>Augusto César Oliveira 👐</strong>.
        </Typography>

        <Typography gutterBottom variant="h5">
          My Social Networks
        </Typography>

        <div id="social-networks">
          <Typography paragraph>
            <span>
              <LinkedInIcon />
              &nbsp;LinkedIn:&nbsp;
            </span>
            <Link
              target="_blank"
              href="https://www.linkedin.com/in/augusto-césar-oliveira-7ab3081ba"
              rel="noreferrer"
            >
              click here
            </Link>
            .
          </Typography>

          <Typography paragraph>
            <span>
              <GitHubIcon />
              &nbsp;GitHub:&nbsp;
            </span>
            <Link
              target="_blank"
              href="https://github.com/augustocesarfmo"
              rel="noreferrer"
            >
              click here
            </Link>
            .
          </Typography>

          <Typography paragraph>
            <span>
              <DescriptionIcon />
              &nbsp;Currículo Lattes:&nbsp;
            </span>
            <Link
              target="_blank"
              href="http://lattes.cnpq.br/9776469326087178"
              rel="noreferrer"
            >
              click here
            </Link>
            .
          </Typography>
        </div>

        <Typography gutterBottom variant="h5">
          Other Information
        </Typography>

        <ul>
          <li>
            <Typography gutterBottom>
              Technology used in development:&nbsp;
              <Link
                target="_blank"
                href="https://reactjs.org/"
                rel="noreferrer"
              >
                ReactJS
              </Link>
              .
            </Typography>
          </li>

          <li>
            <Typography gutterBottom>
              <strong>Contact e-mail</strong>: augustocesarfmo@gmail.com.
            </Typography>
          </li>

          <li>
            <Typography gutterBottom>
              Click&nbsp;
              <Link
                target="_blank"
                href="https://spatialworkspace.ddns.net/how-to-use"
                rel="noreferrer"
              >
                here
              </Link>
              &nbsp;to access more information about the platform.
            </Typography>
          </li>
        </ul>
      </Content>
    </Container>
  );
}

About.propTypes = {
  pageName: PropTypes.string.isRequired,
};

export default About;
