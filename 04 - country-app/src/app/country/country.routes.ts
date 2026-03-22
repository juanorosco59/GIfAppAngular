import { Routes } from "@angular/router";
import { HomePage } from "../shared/pages/home-page/home-page";
import { ByCapitalPage } from "./pages/by-capital-page/by-capital-page";
import { CountryLayout } from "./layouts/country-layout/country-layout";
import { ByCountryPage } from "./pages/by-country-page/by-country-page";
import { ByRegionPage } from "./pages/by-region-page/by-region-page";
import { CountryPage } from "./pages/country-page/country-page";

export const countryRoutes: Routes = [

    {
        path: '',
        component: CountryLayout,
        children: [
            {
                path: 'by-capital',
                component: ByCapitalPage
            },
            {
                path: 'by-country',
                component: ByCountryPage
            },
            {
                path: 'by-region',
                component: ByRegionPage
            },
            {
                //Medienta la siguiente ruta, se pasa un valor personalizado a la página de país, el cual 
                // se obtiene a través del parámetro custom_code

                path: 'by/:custom_code',
                component: CountryPage
            },

            {
                path: '**',
                redirectTo: ''

            }
        ]
    }
];