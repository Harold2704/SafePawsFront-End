import { Routes } from '@angular/router';
import { Menu } from './components/menu/menu';
import { Adoptions } from './components/adoptions/adoptions';
import { Listaradoptions } from './components/adoptions/listaradoptions/listaradoptions';
import { Clientes } from './components/clientes/clientes';
import { Listarclients } from './components/clientes/listarclients/listarclients';
import { Comments } from './components/comments/comments';
import { Listarcomments } from './components/comments/listarcomments/listarcomments';
import { Listardonations } from './components/donations/listardonations/listardonations';
import { Donations } from './components/donations/donations';
import { Medicalhistories } from './components/medicalhistories/medicalhistories';
import { Listarmedicalhistories } from './components/medicalhistories/listarmedicalhistories/listarmedicalhistories';
import { Pets } from './components/pets/pets';
import { Listarpets } from './components/pets/listarpets/listarpets';
import { Races } from './components/races/races';
import { Listarraces } from './components/races/listarraces/listarraces';
import { Shelters } from './components/shelters/shelters';
import { Listarshelters } from './components/shelters/listarshelters/listarshelters';
import { Vaccinepets } from './components/vaccinepets/vaccinepets';
import { Listarvaccinepets } from './components/vaccinepets/listarvaccinepets/listarvaccinepets';
import { Vaccines } from './components/vaccines/vaccines';
import { Listarvaccines } from './components/vaccines/listarvaccines/listarvaccines';
import { Vouchers } from './components/vouchers/vouchers';
import { Listarvouchers } from './components/vouchers/listarvouchers/listarvouchers';
import { Creaeditaadoptions } from './components/adoptions/creaeditaadoptions/creaeditaadoptions';
import { Creaeditaclients } from './components/clientes/creaeditaclients/creaeditaclients';
import { Creaeditacomments } from './components/comments/creaeditacomments/creaeditacomments';
import { Creaeditadonations } from './components/donations/creaeditadonations/creaeditadonations';
import { Creaeditamedicalhistories } from './components/medicalhistories/creaeditamedicalhistories/creaeditamedicalhistories';
import { Creaeditapets } from './components/pets/creaeditapets/creaeditapets';
import { Creaeditaraces } from './components/races/creaeditaraces/creaeditaraces';
import { Creaeditashelters } from './components/shelters/creaeditashelters/creaeditashelters';
import { Creaeditavaccinepets } from './components/vaccinepets/creaeditavaccinepets/creaeditavaccinepets';
import { Creaeditavaccines } from './components/vaccines/creaeditavaccines/creaeditavaccines';
import { Creaeditavouchers } from './components/vouchers/creaeditavouchers/creaeditavouchers';
import { Reportes } from './components/reportes/reportes';
import { Adopcionescliente } from './components/reportes/adopcionescliente/adopcionescliente';
import { Resumenadopciones } from './components/reportes/resumenadopciones/resumenadopciones';
import { Comentariosalbergue } from './components/reportes/comentariosalbergue/comentariosalbergue';
import { Donacionescliente } from './components/reportes/donacionescliente/donacionescliente';
import { Donacionesmetodopago } from './components/reportes/donacionesmetodopago/donacionesmetodopago';
import { Recaudadoalbergue } from './components/reportes/recaudadoalbergue/recaudadoalbergue';

export const routes: Routes = [
    { 
        path: '', component: Menu 
    },
    {
        path:'adoption', component:Adoptions,
        children:[
            {
                path:'list', component:Listaradoptions
            },
            {
                path:'register', component:Creaeditaadoptions
            },
            {
                path:'modification/:id', component:Creaeditaadoptions
            }
        ],
    },
    {
        path:'client', component:Clientes,
        children:[
            {
                path:'list', component:Listarclients
            },
            {
                path:'register', component:Creaeditaclients
            },
            {
                path:'modification/:id', component:Creaeditaclients
            }
        ],
    },
    {
        path:'comments', component:Comments,
        children:[
            {
                path:'list', component:Listarcomments
            },
            {
                path:'register', component:Creaeditacomments
            },
            {
                path:'modification/:id', component:Creaeditacomments
            }
        ],
    },
    {
        path:'donations', component:Donations,
        children:[
            {
                path:'list', component:Listardonations
            },
            {
                path:'register', component:Creaeditadonations
            },
            {
                path:'modification/:id', component:Creaeditadonations
            }
        ],
    },
    {
        path:'medicalhistory', component:Medicalhistories,
        children:[
            {
                path:'list', component:Listarmedicalhistories
            },
            {
                path:'register', component:Creaeditamedicalhistories
            },
            {
                path:'modification/:id', component:Creaeditamedicalhistories
            }
        ],
    },
    {
        path:'pet', component:Pets,
        children:[
            {
                path:'list', component:Listarpets
            },
            {
                path:'register', component:Creaeditapets
            },
            {
                path:'modification/:id', component:Creaeditapets
            }
        ],
    },
    {
        path:'race', component:Races,
        children:[
            {
                path:'list', component:Listarraces
            },
            {
                path:'register', component:Creaeditaraces
            },
            {
                path:'modification/:id', component:Creaeditaraces
            }
        ],
    },
    {
        path:'shelter', component:Shelters,
        children:[
            {
                path:'list', component:Listarshelters
            },
            {
                path:'register', component:Creaeditashelters
            },
            {
                path:'modification/:id', component:Creaeditashelters
            }
        ],
    },
    {
        path:'vaccinePet', component:Vaccinepets,
        children:[
            {
                path:'list', component:Listarvaccinepets
            },
            {
                path:'register', component:Creaeditavaccinepets
            },
            {
                path:'modification/:id', component:Creaeditavaccinepets
            }
        ],
    },
    {
        path:'vaccine', component:Vaccines,
        children:[
            {
                path:'list', component:Listarvaccines
            },
            {
                path:'register', component:Creaeditavaccines
            },
            {
                path:'modification/:id', component:Creaeditavaccines
            }
        ],
    },
    {
        path:'voucher', component:Vouchers,
        children:[
            {
                path:'list', component:Listarvouchers
            },
            {
                path:'register', component:Creaeditavouchers
            },
            {
                path:'modification/:id', component:Creaeditavouchers
            }
        ],
    },
    {
        path:'reportes', component:Reportes,
        children:[
            {
                path:'cantidadAdopcionesCliente', component:Adopcionescliente
            },
            {
                path:'resumenAdopcionesRefugio', component:Resumenadopciones
            },
            {
                path:'comentariosPorAlbergue', component:Comentariosalbergue
            },
            {
                path:'cantidadDonacionesCliente', component:Donacionescliente
            },
            {
                path:'cantidadDonacionesMetodoPago', component:Donacionesmetodopago
            },
            {
                path:'totalRecaudadoPorAlbergue', component:Recaudadoalbergue
            }
        ],
    },
];
