// Validação de email no frontend
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Função para testar conexão com o servidor
async function testarServidor() {
    try {
        const response = await fetch('http://localhost:3000/test', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const data = await response.json();
        console.log('Servidor está respondendo:', data);
        return true;
    } catch (error) {
        console.error('Servidor não está respondendo:', error);
        return false;
    }
}

// Função para realizar login
async function fazerLogin(email, senha) {
    try {
        // Primeiro verifica se o servidor está respondendo
        const servidorOk = await testarServidor();
        if (!servidorOk) {
            throw new Error('Não foi possível conectar ao servidor. Verifique se ele está rodando na porta 3000.');
        }

        console.log('Enviando requisição de login...');
        console.log('URL: http://localhost:3000/login');
        console.log('Dados:', { email, senha: senha ? '***' : 'vazia' });
        
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, senha })
        });

        console.log('Resposta recebida - Status:', response.status);
        console.log('Resposta recebida - OK:', response.ok);

        if (!response.ok) {
            let errorData;
            try {
                errorData = await response.json();
                console.log('Dados do erro:', errorData);
            } catch (e) {
                console.error('Erro ao parsear JSON da resposta de erro:', e);
                errorData = { message: `Erro HTTP ${response.status}: ${response.statusText}` };
            }
            throw new Error(errorData.message || `Erro HTTP: ${response.status}`);
        }

        const data = await response.json();
        console.log('Dados de sucesso recebidos:', data);
        
        if (data.success) {
            // Login bem-sucedido
            console.log('Usuário logado:', data.usuario);
            
            // Redirecionar para a área administrativa ou página desejada
            window.location.href = './areaAdm.html';
            
            return true;
        } else {
            // Login falhou
            alert(data.message || 'Erro ao fazer login');
            return false;
        }
    } catch (error) {
        console.error('Erro completo:', error);
        console.error('Nome do erro:', error.name);
        console.error('Mensagem do erro:', error.message);
        
        let mensagemErro = 'Erro ao conectar com o servidor.\n\n';
        
        if (error.message.includes('fetch')) {
            mensagemErro += 'Não foi possível conectar ao servidor.\n';
            mensagemErro += 'Possíveis causas:\n';
            mensagemErro += '1. O servidor não está rodando\n';
            mensagemErro += '2. A porta 3000 está bloqueada\n';
            mensagemErro += '3. Problema de rede/firewall\n\n';
            mensagemErro += 'Verifique o console do terminal onde o servidor deve estar rodando.';
        } else {
            mensagemErro += error.message;
        }
        
        alert(mensagemErro);
        return false;
    }
}

// Função para fazer logout
async function fazerLogout() {
    try {
        const response = await fetch('http://localhost:3000/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const data = await response.json();
        
        if (data.success) {
            alert('Logout realizado com sucesso!');
            window.location.href = './login.html';
        } else {
            alert(data.message || 'Erro ao fazer logout');
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao conectar com o servidor.');
    }
}

// Função para verificar se o usuário está logado
async function verificarLogin() {
    try {
        const response = await fetch('http://localhost:3000/verificar-login', {
            method: 'GET'
        });

        const data = await response.json();
        
        if (data.logado) {
            console.log('Usuário está logado:', data.usuario);
            return data.usuario;
        } else {
            console.log('Usuário não está logado');
            return null;
        }
    } catch (error) {
        console.error('Erro ao verificar login:', error);
        return null;
    }
}

// Exemplo de uso com um formulário de login
// Adicione esta função quando tiver um formulário HTML
function configurarFormularioLogin() {
    const formLogin = document.getElementById('formLogin');
    
    if (formLogin) {
        formLogin.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const emailInput = document.getElementById('email');
            const senhaInput = document.getElementById('senha');
            
            const email = emailInput.value.trim();
            const senha = senhaInput.value;
            
            // Validar email
            if (!validarEmail(email)) {
                alert('Por favor, insira um email válido!');
                emailInput.focus();
                return;
            }
            
            // Validar senha
            if (senha.length < 4) {
                alert('A senha deve ter pelo menos 4 caracteres!');
                senhaInput.focus();
                return;
            }
            
            // Fazer login
            await fazerLogin(email, senha);
        });
    }
}

// Função para validar campos em tempo real
function configurarValidacaoCampos() {
    const emailInput = document.getElementById('email');
    const senhaInput = document.getElementById('senha');
    
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            const email = this.value.trim();
            
            if (email && !validarEmail(email)) {
                this.classList.add('error');
                mostrarErro(this, 'Por favor, insira um email válido!');
            } else {
                this.classList.remove('error');
                this.classList.add('success');
                removerErro(this);
            }
        });
    }
    
    if (senhaInput) {
        senhaInput.addEventListener('blur', function() {
            const senha = this.value;
            
            if (senha && senha.length < 4) {
                this.classList.add('error');
                mostrarErro(this, 'A senha deve ter pelo menos 4 caracteres!');
            } else if (senha) {
                this.classList.remove('error');
                this.classList.add('success');
                removerErro(this);
            }
        });
    }
}

function mostrarErro(input, mensagem) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    
    if (small) {
        small.innerText = mensagem;
        formControl.className = 'form-control error';
    }
}

function removerErro(input) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    
    if (small) {
        small.innerText = '';
        formControl.className = 'form-control success';
    }
}

// Auto-configurar quando a página carregar
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', configurarFormularioLogin);
    document.addEventListener('DOMContentLoaded', configurarValidacaoCampos);
} else {
    configurarFormularioLogin();
    configurarValidacaoCampos();
}

