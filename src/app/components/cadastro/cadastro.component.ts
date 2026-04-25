import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Produto } from '../../models/produto';
import { ProdutoService } from '../../services/produto.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  formulario!: FormGroup;
  modoEdicao = false;
  produtoId?: number;
  loading = false;
  salvando = false;
  mensagemSucesso = '';
  mensagemErro = '';

  categorias = [
    'Eletrônicos',
    'Periféricos',
    'Informática',
    'Smartphones',
    'Acessórios',
    'Games',
    'Outros'
  ];

  constructor(
    private fb: FormBuilder,
    private produtoService: ProdutoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.inicializarFormulario();

    // Verificar se está em modo edição (tem ID na rota)
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.modoEdicao = true;
        this.produtoId = +params['id'];
        this.carregarProduto(this.produtoId);
      }
    });
  }

  inicializarFormulario(): void {
    this.formulario = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      descricao: ['', [Validators.required, Validators.minLength(10)]],
      preco: ['', [Validators.required, Validators.min(0.01)]],
      quantidade: ['', [Validators.required, Validators.min(0)]],
      categoria: ['', Validators.required],
      imagem: ['']
    });
  }

  carregarProduto(id: number): void {
    this.loading = true;
    this.produtoService.getProdutoById(id).subscribe({
      next: (produto) => {
        this.formulario.patchValue(produto);
        this.loading = false;
      },
      error: (err) => {
        this.mensagemErro = 'Erro ao carregar produto para edição.';
        this.loading = false;
        console.error(err);
      }
    });
  }

  salvar(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    this.salvando = true;
    const produto: Produto = this.formulario.value;

    if (this.modoEdicao && this.produtoId) {
      // PUT - Atualizar
      this.produtoService.atualizarProduto(this.produtoId, produto).subscribe({
        next: () => {
          this.mensagemSucesso = 'Produto atualizado com sucesso!';
          this.salvando = false;
          setTimeout(() => this.router.navigate(['/painel']), 1500);
        },
        error: (err) => {
          this.mensagemErro = 'Erro ao atualizar produto.';
          this.salvando = false;
          console.error(err);
        }
      });
    } else {
      // POST - Cadastrar
      this.produtoService.cadastrarProduto(produto).subscribe({
        next: () => {
          this.mensagemSucesso = 'Produto cadastrado com sucesso!';
          this.salvando = false;
          this.formulario.reset();
          setTimeout(() => this.router.navigate(['/painel']), 1500);
        },
        error: (err) => {
          this.mensagemErro = 'Erro ao cadastrar produto.';
          this.salvando = false;
          console.error(err);
        }
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/painel']);
  }

  // Helpers para validação no template
  campoInvalido(campo: string): boolean {
    const control = this.formulario.get(campo);
    return !!(control && control.invalid && control.touched);
  }

  getErro(campo: string): string {
    const control = this.formulario.get(campo);
    if (!control || !control.errors || !control.touched) return '';

    if (control.errors['required']) return 'Campo obrigatório.';
    if (control.errors['minlength']) {
      const min = control.errors['minlength'].requiredLength;
      return `Mínimo de ${min} caracteres.`;
    }
    if (control.errors['min']) return 'Valor deve ser maior que zero.';
    return 'Campo inválido.';
  }
}
