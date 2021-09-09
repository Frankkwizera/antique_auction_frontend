
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import {NgModule} from '@angular/core';
@NgModule({
    exports: [
        MatFormFieldModule, MatInputModule,
        MatIconModule, MatCardModule,
        MatButtonModule
    ]
  })
export class MaterialModule {}