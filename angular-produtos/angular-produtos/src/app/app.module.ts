import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { PainelPrincipalComponent } from './components/painel-principal/painel-principal.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    PainelPrincipalComponent,
    CadastroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,    // Para chamadas HTTP à API
    ReactiveFormsModule  // Para Reactive Forms no Cadastro
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
