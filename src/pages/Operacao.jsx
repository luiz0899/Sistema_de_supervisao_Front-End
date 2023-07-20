
import "../style/Operacao.css";
import bomba from "../assets/img/bomba.png";
import solenoide from "../assets/img/solenoide.png";
import blogFetch from "../axios/config";

const Operacao = () => {//faz as modificações no estado da bomba

  const id = 1;

  function LigBomb(event) {
    event.preventDefault();

    const modEstadoBomb = {

      water_pump: true,
    };
    console.log(modEstadoBomb.waterPump);
    blogFetch
      .put(`/operation_water_pump/water_pump/${id}`, modEstadoBomb)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  function deslBomb(event) {
    event.preventDefault();

    const modEstadoBomb = {

      water_pump: false,
    };
    console.log(modEstadoBomb.waterPump);
    blogFetch
      .put(`/operation_water_pump/water_pump/${id}`, modEstadoBomb)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  function ligSole(event) {
    event.preventDefault();

    const modEstadoSole = {

      solenoid: true,
    };
    console.log(modEstadoSole.waterPump);
    blogFetch
      .put(`/operation_water_pump/solenoid/${id}`, modEstadoSole)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  function deslSole(event) {
    event.preventDefault();

    const modEstadoSole = {

      solenoid: false,
    };
    console.log(modEstadoSole.waterPump);
    blogFetch
      .put(`/operation_water_pump/solenoid/${id}`, modEstadoSole)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function man(event) {
    event.preventDefault();

    const modEstado = {
      manual: true,
    };
    console.log(modEstado.waterPump);
    blogFetch
      .put(`/operation_water_pump/manual/${id}`, modEstado)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function aut(event) { 
    event.preventDefault();

    const modEstado = {
      manual: false,
    };
    console.log(modEstado.waterPump);
    blogFetch
      .put(`/operation_water_pump/manual/${id}`, modEstado)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }



  return (//tela
    <div className="imgFund" >
      <div className="operacao">

        <h1> Operacão </h1>

        <div className="fundo">

          <div className="row" >

            <div className="bomba">

              <img src={bomba} className="imgBomba" />


              <button type="button" class="btn btn-outline-light" onClick={LigBomb}>
                Ligar
              </button>

              <button type="button" class="btn btn-outline-light" onClick={deslBomb}>
                Desligar
              </button>


            </div>
            <div className="solenoide ">

              <img src={solenoide} className="imgSolenoide" />

              <button type="button" class="btn btn-outline-light" onClick={ligSole}>
                Ligar
              </button>

              <button type="button" class="btn btn-outline-light" onClick={deslSole}>
                Desligar
              </button>

            </div>


          </div>

          <div className=" btnAltMan">

            <button type="button" class="btn btn-outline-dark" onClick={man}>
              Manual
            </button>

            <button type="button" class="btn btn-outline-dark" onClick={aut}>
              Automatico
            </button>

          </div>

        </div>

      </div>
    </div>

  );


};

export default Operacao;