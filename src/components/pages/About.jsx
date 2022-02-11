import React, { useContext, useEffect } from "react";
import { ActionsContext } from "../../App";
import { about } from "../../constsNotInStore/titles";

const About = () => {
  const actsContext = useContext(ActionsContext);
  const { setMainTitle } = actsContext;

  useEffect(() => {
    setMainTitle(about);
  }, []);

  return <div>Information about the Project</div>;
};

export default About;
