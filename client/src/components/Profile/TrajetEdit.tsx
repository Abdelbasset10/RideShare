import React from "react";
import { Trajet } from "../../utils/type-interfaces";

interface TrajetEditProps {
  trajet: Trajet;
}

const TrajetEdit = ({ trajet }: TrajetEditProps) => {
  return <div>Trajet id: {trajet.id} </div>;
};

export default TrajetEdit;
