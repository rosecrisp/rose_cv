import { useEffect, useReducer } from "react";
import Context from "./context";

const type = {
  NAV: "NAV",
  SIDEBAR: "SIDEBAR",
};

const sections = ["about", "resume", "works", "blog", "contacts", "blog-post"];

const navReducer = (state, action) => {
  switch (action.type) {
    case type.NAV:
      return {
        ...state,
        nav: action.payload,
      };
    case type.SIDEBAR:
      return {
        ...state,
        sidebar: action.payload,
      };

    default:
      return state;
  }
};

const State = (props) => {
  const initialState = {
    nav: "resume",
    sidebar: false,
  };
  const [state, dispatch] = useReducer(navReducer, initialState);

  const changeNav = (value) => {
    dispatch({
      type: type.NAV,
      payload: value,
    });
  };
  const changeSideBar = (value) => {
    dispatch({
      type: type.SIDEBAR,
      payload: value,
    });
  };

  useEffect(() => {
    const applyHash = () => {
      const hash = (window.location.hash || "").replace(/^#/, "");
      if (hash && sections.includes(hash)) {
        changeNav(hash);
      }
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, []);

  return (
    <Context.Provider
      value={{
        // nav
        nav: state.nav,
        changeNav: changeNav,
        // sidebar
        sidebar: state.sidebar,
        changeSideBar: changeSideBar,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default State;
