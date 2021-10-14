import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Icon } from "rbx";



const NestedMenu = ({
  isActive,
  activeMenus,
  toggleMenus,
  name,
  links,
  depth,
}) => {
  const getItem = (item, id) => {
    // if menu is active show child links
    if (item.links) {
      return (
        <div key={id}>
          <div
            key={id}
            className="nested-menu-item is-active"
            role="button"
            tabIndex="0"
            onClick={() => toggleMenus(id)}
            onKeyDown={() => null}
          >
            <span>{item.name}</span>
            <Icon size="small">
              <FontAwesomeIcon icon="chevron-up" />
            </Icon>
          </div>
          <NestedMenu
            activeMenus={activeMenus}
            depth={depth + 1}
            links={item.links}
            name={item.name}
            toggleMenus={toggleMenus}
          />
        </div>
      );
    }

    if (item.to) {
      return (
        <Link
          key={id}
          className="nested-menu-item"
          to={item.to}
          onClick={() => toggleMenus(id)}
        >
          <span>{item.name}</span>
        </Link>
      );
    }
    if (item.href) {
      return (
        <a
          key={id}
          className="nested-menu-item"
          href={item.href}
          rel="noopener noreferrer"
          target="_blank"
          onClick={() => toggleMenus(id)}
        >
          <span>{item.name}</span>
        </a>
      );
    }

    return (
      <a
        key={`${item.name}-${depth}`}
        className="nested-menu-item"
        href={`#${item.name}`}
        onClick={() => toggleMenus(id)}
      >
        <span>{item.name}</span>
        <Icon size="small">
          <FontAwesomeIcon icon="chevron-down" />
        </Icon>
      </a>
    );
  };

  const items = links.map((child, i) =>
    getItem(child, `${name}-${i}-${depth}`),
  );

  if (depth === 0) {
    return (
      <div className={`nested-menu${isActive ? " is-active" : ""}`}>
        <div className="nested-menu-main">
          <div className="nested-menu-title">{name}</div>
          <div className="nested-menu-container">{items}</div>
        </div>
        <div className="nested-menu-foot">
          <p>footer</p>
        </div>
      </div>
    );
  }
  return (
    <div className={`nested-menu-container deep depth-${depth}`}>{items}</div>
  );
};

NestedMenu.propTypes = {
  name: PropTypes.string,
  links: PropTypes.array,
  isActive: PropTypes.bool,
  depth: PropTypes.number,
  activeMenus: PropTypes.object,
  toggleMenus: PropTypes.func,
};
NestedMenu.defaultProps = {
  links: [],
  depth: 0,
  isActive: false,
  activeMenus: {},
  toggleMenus: () => null,
  name: "",
};

export default NestedMenu;
