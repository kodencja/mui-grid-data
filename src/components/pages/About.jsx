import React, { useContext, useEffect } from "react";
import { ActionsContext } from "../../App";
import { about } from "../../constsNotInStore/titles";
import AboutInfo from "../smallComponents/forAbout/AboutInfo";

const About = () => {
  const actsContext = useContext(ActionsContext);
  const { setMainTitle } = actsContext;

  useEffect(() => {
    setMainTitle(about);
  }, []);

  return <AboutInfo />;
};

export default About;
