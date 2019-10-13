import React from 'react';
import BrowserDetection from 'react-browser-detection';


export const getClearCacheInstructions = () => {
    let browser = new BrowserDetection().state.browser;

    switch (browser) {
        case 'chrome':
            return {
                browserType: 'chrome',
                steps: [
                    'Clique nos três pontos na parte superior direita do navegador.',
                    'Clique no menu \"Configurações\".',
                    'Clique em \"Mostrar configurações avançadas...\" na parte inferior da tela.',
                    'No submenu \"Privacidade\" clique em \"Limpar Dados de Navegação\".',
                    'Selecione todos os checkboxes.',
                    'Selecione o intervalo de tempo \"Todo o período\".',
                    'Clique no botão \"Limpar Dados de Navegação\" na parte inferior.',
                    'Pronto, sua Cache está limpa.'
                ]

            };
            break;
        case 'firefox':
            return {
                browserType: 'firefox',
                steps: [
                    'Clique nos três traços na parte superior direita do navegador.',
                    'Clique no menu \"Preferências\".',
                    'Clique em \"Privacidade e Segurança\" na parte superior esquerda da tela.',
                    'No submenu \"Conteúdo Web em cache\" clique no botão \"Limpar agora\".',
                    'Pronto, sua Cache está limpa.'
                ]
            };
            break;
        case 'opera':
            return {
                browserType: 'opera',
                steps: [
                    'Clique no botão \"Opera\" na parte superior esquerda do navegador.',
                    'Posicione o mouse sobre o elemento \"Configurações\".',
                    'Clique em \"Deletar Dados Privados\".',
                    'Selecione \"Deletar completamente todos os dados da Cache\" dentre as opções sugeridas.',
                    'Clique em \"Deletar\".',
                    'Pronto, sua Cache está limpa.'
                ]
            };
            break;
        case 'safari':
            return {
                browserType: 'safari',
                steps: [
                    'Pressione a tecla ALT quando o menu superior não estiver visível.',
                    'Clique em \"Editar\" na barra de menu.',
                    'Clique em \"Esvaziar Cache\".',
                    'Clique em \"Esvaziar\" na caixa de diálogo.',
                    'Pronto, sua Cache está limpa.'
                ]
            };
            break;
        case 'explorer':
            return {
                browserType: 'explorer',
                steps: [
                    'Clique na engrenagem na parte superior direita do navegador.',
                    'Posicione o mouse sobre o elemento \"Segurança\".',
                    'Clique em \"Deletar Histórico de Navegação\".',
                    'Selecione \"Arquivos temporários da Internet\".',
                    'Clique em \"Deletar\".',
                    'Pronto, sua Cache está limpa.'
                ]
            };
            break;
        default:
            return {
                browserType: 'desconhecido',
                steps: [
                    'Clique nos três traços na parte superior direita do navegador.',
                    'Clique no menu \"Configurações\".',
                    'Clique em \"Histórico\" no menu lateral esquerdo.',
                    'Clique em \"Limpar Dados de Navegação\".',
                    'Selecione \"Esvaziar Cache\".',
                    'Clique no botão \"Limpar Dados de Navegação\" na parte inferior.',
                    'Pronto, sua Cache está limpa.'
                ]
            };
            break;
    }
};
