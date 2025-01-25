import React, { useState, useEffect } from "react";
import axios from "axios";

const MaterialsForm = () => {

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <button type="submit">Cadastrar Material</button>
      </form>
    </div>
  );
};

export default MaterialsForm;
