export interface IInteractionKey {
    id: string;
  }
  
  export interface IInteraction extends IInteractionKey {
    id_usuario: string,
    typeInteraction: string,
    valueInteraction: number,
    typeElement: string, 
    id_element: string
  }