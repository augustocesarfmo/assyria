import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import { List, ListItem, ListItemText, Divider } from '@material-ui/core';

import { NavLink, useLocation } from 'react-router-dom';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Container, SubList } from './styles';

const useStyles = makeStyles(theme => ({
  toolbar: theme.mixins.toolbar,
}));

function Menu({ handleDrawerToggle }) {
  const classes = useStyles();
  const theme = useTheme();
  // extract pathname from location
  const { pathname } = useLocation();

  const CustomLink = React.useMemo(
    () =>
      forwardRef((linkProps, ref) => (
        <NavLink
          ref={ref}
          {...linkProps}
          activeStyle={{
            fontWeight: 500,
            color: theme.palette.primary.main,
          }}
          style={{
            color: 'inherit',
          }}
          onClick={handleDrawerToggle}
        />
      )),
    [handleDrawerToggle, theme.palette.primary.main],
  );

  return (
    <Container color={theme.palette.primary.main}>
      <div className={classes.toolbar} id="toolbar">
        <h2>Spatial Workspace</h2>

        <div>
          <span>v3.8.2</span>

          <CustomLink to="/about" id="about-link">
            About
          </CustomLink>
        </div>
      </div>

      <Divider />

      <List>
        <ListItem
          button
          className="how-to-use-button"
          component={CustomLink}
          to="/how-to-use"
        >
          <div>
            <ListItemText primary="HOW TO USE" />
          </div>
        </ListItem>

        <ListItem
          button
          to="/map"
          isActive={() => ['/', '/map'].includes(pathname)}
          component={CustomLink}
        >
          <ListItemText primary="MAP" />
        </ListItem>

        <ListItem>
          <ListItemText primary="FRACTAL" />
        </ListItem>

        <SubList>
          <ListItem button component={CustomLink} to="/distance">
            <span>Ex. Distance Between Two Points</span>
          </ListItem>

          <ListItem button component={CustomLink} to="/dimension">
            <span>Ex. Fractal Dimension Calc</span>
          </ListItem>

          <ListItem button component={CustomLink} to="/fractal">
            <span>Massive Fractal Dimension Calc</span>
          </ListItem>
        </SubList>

        <ListItem>
          <ListItemText primary="IBGE" />
        </ListItem>

        <SubList>
          <ListItem button component={CustomLink} to="/region">
            <span>Associate Regions</span>
          </ListItem>

          <ListItem button component={CustomLink} to="/search">
            <span>Search Regions</span>
          </ListItem>
        </SubList>

        <ListItem button component={CustomLink} to="/crs">
          <ListItemText primary="CRS (RIO GRANDE DO SUL)" />
        </ListItem>

        <ListItem>
          <ListItemText primary="GEOCODING" />
        </ListItem>

        <SubList>
          <ListItem button component={CustomLink} to="/address">
            <span>Ex. Address Geocoding</span>
          </ListItem>

          <ListItem button component={CustomLink} to="/geocoding">
            <span>Massive Address Geocoding</span>
          </ListItem>
        </SubList>

        <ListItem button component={CustomLink} to="/cases">
          <ListItemText primary="NUMBER OF CASES COUNTER" />
        </ListItem>
      </List>
    </Container>
  );
}

Menu.propTypes = {
  handleDrawerToggle: PropTypes.func,
};

Menu.defaultProps = {
  handleDrawerToggle: null,
};

export default Menu;
