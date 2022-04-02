import React from "react";
import TabRender from "../../components/TabRender";

const Education = ({ route, navigation }) => {

  const { list } = route.params;
  const { fire } = route.params;

  return (
    <TabRender list={list} fire={fire} />
  )
}

export default Education;
