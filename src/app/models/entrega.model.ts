export interface Endereco {
    cep: string;
    rua: string;
    tipo: string;
    numero: number;
    bairro: string;
    estado: string;
    cidade: string;
    padrao: boolean;
}

export interface MetodoEnvio {
    tipo: string;
    prazo: number;
    valor: number;
}