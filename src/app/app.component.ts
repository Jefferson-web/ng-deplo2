import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Editor, Validators } from 'ngx-editor';
import { MenuItem, MessageService } from 'primeng/api';

export interface Image {
  url: string | ArrayBuffer;
  file: File;
}

export interface Anuncio {
  titulo: string;
  descripcion: string;
  nombre: string;
  genero: string;
  nacionalidad: string;
  edad: string;
  celular: string;
  tarifas: any[];
  atenciones: any[];
  servicios: any[];
  salidas: any[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [MessageService]
})
export class AppComponent implements OnInit, OnDestroy {

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  items2: MenuItem[] | undefined;
  servicios: any[] = [
    {
      value: '1',
      label: 'Servicio 1'
    },
    {
      value: '2',
      label: 'Servicio 2'
    }
    , {
      value: '3',
      label: 'Servicio 3'
    }
  ];

  eliminarTarifa(i: number){
    this.tarifas.removeAt(i);
  }

  salidas: any[] = [
    {
      value: '1',
      label: 'Salida 1'
    },
    {
      value: '2',
      label: 'Salida 2'
    }
    , {
      value: '3',
      label: 'Salida 3'
    }, {
      value: '4',
      label: 'Salida 4'
    }
    , {
      value: '5',
      label: 'Salida 5'
    }
  ];

  activarInputFile() {
    this.fileInput.nativeElement.click();
  }

  serviciosSeleccionados: any[] = [];
  salidasSeleccionadas: any[] = [];


  constructor(private fb: FormBuilder, private messageService: MessageService) {

  }

  onSubmit() {
    const anuncio = this.adForm.value as Anuncio;
    anuncio.servicios = this.serviciosSeleccionados;
    anuncio.salidas = this.salidasSeleccionadas;
    console.log(anuncio);
  }

  onServicioSeleccionado(event: any, servicio: any) {
    if (event.checked) {
      this.serviciosSeleccionados.push(servicio);
    } else {
      const index = this.serviciosSeleccionados
        .findIndex(s => s.value == servicio.value);
      if (index !== -1) {
        this.serviciosSeleccionados.splice(index, 1);
      }
    }
  }

  onSalidaSeleccionada(event: any, salida: any) {
    if (event.checked) {
      this.salidasSeleccionadas.push(salida);
    } else {
      const index = this.salidasSeleccionadas
        .findIndex(s => s.value == salida.value);
      if (index !== -1) {
        this.salidasSeleccionadas.splice(index, 1);
      }
    }
  }

  editor: Editor;
  adForm: FormGroup;

  public imagenes: any[] = [];

  cities = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
  ];

  ngOnInit(): void {
    this.editor = new Editor();
    this.adForm = this.fb.group({
      titulo: [''],
      descripcion: [''],
      nombre: [''],
      genero: [''],
      nacionalidad: [''],
      edad: [''],
      celular: [''],
      atenciones: [],
      servicios: [],
      tarifas: this.fb.array([])
    });
    const tarifaForm = this.fb.group({
      nombre: ['1 hora', Validators.required],
      precio: ['', Validators.required]
    });
    this.tarifas.push(tarifaForm);
    this.items2 = [
      {
        label: 'Options',
        items: [
          {
            label: 'Update',
            icon: 'pi pi-refresh',
            command: () => {
              this.update();
            }
          },
          {
            label: 'Delete',
            icon: 'pi pi-times',
            command: () => {
              this.delete();
            }
          }
        ]
      },
      {
        label: 'Navigate',
        items: [
          {
            label: 'Angular',
            icon: 'pi pi-external-link',
            url: 'http://angular.io'
          },
          {
            label: 'Router',
            icon: 'pi pi-upload',
            routerLink: '/fileupload'
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

  agregarTarifa() {
    const tarifaForm = this.fb.group({
      nombre: ['', Validators.required],
      precio: ['', Validators.required]
    });
    this.tarifas.push(tarifaForm);
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  get tarifas() {
    return this.adForm.get('tarifas') as FormArray;
  }

  onChange(event: any) {
    const files = event.target.files;
    const component = this;
    for (const file of files) {
      var reader = new FileReader();
      reader.onload = function (evt) {
        const image: Image = {
          url: evt.target.result,
          file: file
        };
        component.imagenes.push(image);
      };

      reader.readAsDataURL(file);
    }
    console.log(this.imagenes);
  }

  eliminarImagen(i: number) {
    this.imagenes.splice(i, 1);
    this.fileInput.nativeElement.value = "";
  }

  items: any[] = [
    { label: 'Hombres', value: 'Hombres' },
    { label: 'Mujeres', value: 'Mujeres' },
    { label: 'Parejas', value: 'Parejas' },
    { label: 'Trans', value: 'Trans' },
    { label: 'Grupos', value: 'Grupos' }
  ]

  selectedItems!: any[];

  selectAll = false;

  onSelectAllChange(event: any) {
    this.selectedItems = event.checked ? [...this.items] : [];
    this.selectAll = event.checked;
  }

  onChangeMultiselect(event: any) {
    const { originalEvent, value } = event
    if (value) this.selectAll = value.length === this.items.length;
  }

}
