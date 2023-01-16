import { NgModule } from "@angular/core";
import { FooterPageModule } from "./footer/footer.module";
import { FooterPage } from "./footer/footer.page";

@NgModule({
  imports:[FooterPageModule],
  declarations: [],
  exports: [FooterPage],
})
export class SharedModule {}