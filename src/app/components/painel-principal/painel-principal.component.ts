import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Produto } from '../../models/produto';
import { ProdutoService } from '../../services/produto.service';

@Component({
  selector: 'app-painel-principal',
  templateUrl: './painel-principal.component.html',
  styleUrls: ['./painel-principal.component.css']
})
export class PainelPrincipalComponent implements OnInit {

  produtos: Produto[] = [];
  loading = true;
  erro = '';
  mensagemSucesso = '';

  constructor(
    private produtoService: ProdutoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarProdutos();
  }

  carregarProdutos(): void {
    this.loading = true;
    this.produtoService.getProdutos().subscribe({
      next: (dados) => {
        this.produtos = dados;
        this.loading = false;
      },
      error: (err) => {
        this.erro = 'Erro ao carregar produtos. Verifique se o JSON Server está rodando.';
        this.loading = false;
        console.error(err);
      }
    });
  }

  editarProduto(id: number): void {
    this.router.navigate(['/cadastro', id]);
  }

  excluirProduto(id: number): void {
    if (confirm('Deseja realmente excluir este produto?')) {
      this.produtoService.excluirProduto(id).subscribe({
        next: () => {
          this.mensagemSucesso = 'Produto excluído com sucesso!';
          this.carregarProdutos();
          setTimeout(() => this.mensagemSucesso = '', 3000);
        },
        error: (err) => {
          this.erro = 'Erro ao excluir produto.';
          console.error(err);
        }
      });
    }
  }

  formatarPreco(preco: number): string {
    return preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }
}
