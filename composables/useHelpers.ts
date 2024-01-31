import Swal from "sweetalert2";

export const useHelpers = () => {

  const formatarNumeroAbreviado = ( numero: number ) => {
    const sufijos = ["", "K", "M", "B", "T"];
    let contador = 0;

    while (numero >= 1000) {
      numero /= 1000;
      contador++;
    }

    numero = parseFloat(numero.toFixed(2));

    return numero + sufijos[contador];
  }

  const convertirDuracion = ( cadenaDuracion: string ) => {
    const duracion: any = cadenaDuracion.match(/(\d+)(M)?(\d+)?(S)?/);

    const minutos = duracion[2] ? parseInt(duracion[1], 10) : 0;
    const segundos = duracion[4] ? parseInt(duracion[3], 10) : 0;

    return `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
  }

  const showAlert = ( msg: string, type: string ) => {
    const Toast: any = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000
    });

    Toast.fire({ icon: type, title: msg });
  }

  return {
    convertirDuracion,
    formatarNumeroAbreviado,
    showAlert
  }
}
