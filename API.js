var urlApi = "https://entreprise.data.gouv.fr/api/sirene/v3/etablissements";

function GetListeEntreprise(page){

    let xhttp = new XMLHttpRequest();
    let url = urlApi + "?per_page=100&page="+page;

    let donneeEntreprise = [];

     xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var result = JSON.parse(this.response);
        //console.table(result.etablissements);
        //console.log(result);
        for (let i = 0; i < result.etablissements.length; i++) {
          
            let entreprise = result.etablissements[i];
          
            let nom = entreprise.unite_legale.denomination;

            if(nom != null){
                let secteur = entreprise.nomenclature_activite_principale;
                let date_creation = entreprise.date_creation;
                let departement = entreprise.code_postal;
      
                let adresse = entreprise.geo_adresse;
      
                let siege_social = entreprise.etablissement_siege;
      
                let categorie = entreprise.categorie_entreprise;
      
                let localisation = {
                  "longitude" : entreprise.longitude,
                  "latitude" : entreprise.latitude
                };
      
                let siren = entreprise.siren;
                let siret = entreprise.siret;
      
                donneeEntreprise.push(
                  {
                    "nom" : nom,
                    "secteur" : secteur,
                    "date_creation" : date_creation,
                    "departement" : departement,
                    "adresse" : adresse,
                    "est_siege_social" : siege_social,
                    "categorie" : categorie,
                    "localisation" : localisation,
                    "siren" : siren,
                    "siret" : siret,
      
                  }
                );
              }

        }

     }

   };

   xhttp.open("GET", url, false);
   xhttp.send();
   
   return donneeEntreprise;

}

//affichage des données de la première page
console.table(GetListeEntreprise(1));


