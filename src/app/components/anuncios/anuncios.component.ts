import { Component } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-anuncios',
  templateUrl: './anuncios.component.html',
  styleUrl: './anuncios.component.scss',
  providers:[MessageService]
})
export class AnunciosComponent {
  items: MenuItem[] | undefined;

  constructor(private messageService: MessageService) {}
  
  ngOnInit() {
      this.items = [
          {
              label: 'Options',
              items: [
                  {
                      label: 'Editar',
                      icon: 'pi pi-file-edit',
                      command: () => {
                          this.update();
                      }
                  },
                  {
                      label: 'Eliminar',
                      icon: 'pi pi-times',
                      command: () => {
                          this.delete();
                      }
                  }
              ]
          }
      ];
  }

  update() {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Updated' });
  }

  delete() {
      this.messageService.add({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted' });
  }
}
