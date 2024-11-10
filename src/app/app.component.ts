import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrnSelectImports } from '@spartan-ng/ui-select-brain';
import { HlmSelectImports } from '@spartan-ng/ui-select-helm';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BrnSelectImports, HlmSelectImports, HlmIconComponent, FormsModule, CommonModule],
  templateUrl: "./app.component.html",
})
export class AppComponent {
  public chargeProjects: any[] = [];

  public prestataires: any[] = [
    { id: 1, name: 'Prestataire 1', num_marche: '123456' },
    { id: 2, name: 'Prestataire 2', num_marche: '123457' },
    { id: 3, name: 'Prestataire 3', num_marche: '123458' },
  ];

  private zoneSite1: any[] = [
    { id: 1, name: 'Zone 1', prestataires: this.prestataires, id_site: 1, num_lot: '123456' },
    { id: 2, name: 'Zone 2', prestataires: this.prestataires, id_site: 1, num_lot: '123457' },
    { id: 3, name: 'Zone 3', prestataires: this.prestataires, id_site: 1, num_lot: '123458' },
  ];

  private zoneSite2: any[] = [
    { id: 4, name: 'Zone 4', prestataires: this.prestataires, id_site: 2, num_lot: '123459' },
    { id: 5, name: 'Zone 5', prestataires: this.prestataires, id_site: 2, num_lot: '123460' },
    { id: 6, name: 'Zone 6', prestataires: this.prestataires, id_site: 2, num_lot: '123461' },
  ];

  private zoneSite3: any[] = [
    { id: 7, name: 'Zone 7', prestataires: this.prestataires, id_site: 3, num_lot: '123462' },
    { id: 8, name: 'Zone 8', prestataires: this.prestataires, id_site: 3, num_lot: '123463' },
    { id: 9, name: 'Zone 9', prestataires: this.prestataires, id_site: 3, num_lot: '123464' },
  ];

  public sites: any[] = [
    { id: 1, name: 'Site 1', code: 'S1', zone: this.zoneSite1 },
    { id: 2, name: 'Site 2', code: 'S2', zone: this.zoneSite2 },
    { id: 3, name: 'Site 3', code: 'S3', zone: this.zoneSite3 },
  ];

  public connectionTypes: any[] = [
    { code: 'neuf', name: 'Neuf' },
    { code: 'modif_branchement', name: 'Modification Branchement' },
    { code: 'liaison_privative', name: 'Liaison Privative' },
  ];

  public typologies: any[] = [
    { code: 'typo_pro_colloc', name: 'Pro/Colloc' },
    { code: 'typo_part', name: 'Particulier' },
  ];

  public selectedChargeProject: any = null;
  public selectedSites: any[] = [];

  constructor() {
    this.chargeProjects = [{ "first_name": "John", "last_name": "Doe", "rows": [{ "id": 0, "zone": { "id": 1, "name": "Zone 1", "prestataires": [{ "id": 1, "name": "Prestataire 1", "num_marche": "123456" }, { "id": 2, "name": "Prestataire 2", "num_marche": "123457" }, { "id": 3, "name": "Prestataire 3", "num_marche": "123458" }], "id_site": 1, "num_lot": "123456" }, "prestataire": { "id": 1, "name": "Prestataire 1", "num_marche": "123456" }, "typologie": { "code": "typo_pro_colloc", "name": "Pro/Colloc" } }, { "id": 1, "zone": { "id": 1, "name": "Zone 1", "prestataires": [{ "id": 1, "name": "Prestataire 1", "num_marche": "123456" }, { "id": 2, "name": "Prestataire 2", "num_marche": "123457" }, { "id": 3, "name": "Prestataire 3", "num_marche": "123458" }], "id_site": 1, "num_lot": "123456" }, "prestataire": { "id": 1, "name": "Prestataire 1", "num_marche": "123456" }, "typologie": { "code": "typo_part", "name": "Particulier" } }, { "id": 2, "zone": { "id": 2, "name": "Zone 2", "prestataires": [{ "id": 1, "name": "Prestataire 1", "num_marche": "123456" }, { "id": 2, "name": "Prestataire 2", "num_marche": "123457" }, { "id": 3, "name": "Prestataire 3", "num_marche": "123458" }], "id_site": 1, "num_lot": "123457" }, "prestataire": { "id": 2, "name": "Prestataire 2", "num_marche": "123457" }, "typologie": { "code": "typo_part", "name": "Particulier" } }] }];
  }



  public onChargeProjectChange(event: any): void {
    this.selectedChargeProject = event;
    console.log(this.selectedChargeProject);
    this.selectedSites = this.sites.filter((site) => event.rows.some((row: any) => row.zone?.id_site === site.id));
  }

  public getZones(): any[] {
    let zones = this.selectedSites.flatMap((site: any) => site.zone);
    zones = zones.filter((zone) => zone !== undefined);
    zones = zones.filter((zone: any, index) => zones.findIndex((z) => z.id === zone.id) === index);
    return zones;
  }

  public getPrestataires(row: any): any[] {
    const zones = this.selectedSites.flatMap((site: any) => site.zone);
    const zone = zones.find((z) => z !== undefined && z.id === row.zone?.id);
    if (!zone) {
      return [];
    }
    return zone.prestataires;
  }

  public onSitesChange(value: any[]): void {
    this.selectedSites = value;
  }


  public onZoneChange(value: any, row: any): void {
    row.zone = value;
  }

  public onPrestataireChange(value: any, row: any): void {
    row.prestataire = value;
  }

  public onTypologyChange(value: any, row: any): void {
    row.typologie = value;
  }

  public addRow(): void {
    this.selectedChargeProject?.rows.push({ id: this.selectedChargeProject.rows.length, zone: null, prestataire: null, typologie: null });
  }

  public removeRow(index: number): void {
    if (this.selectedChargeProject) {
      this.selectedChargeProject.rows = this.selectedChargeProject.rows.filter((row: any) => row.id !== index);
    }
  }

  public isValid(): boolean {
    if (!this.selectedChargeProject) {
      return false;
    }
    return this.selectedChargeProject.first_name !== '' && this.selectedChargeProject.last_name !== '' && this.selectedChargeProject.rows.every((row: any) => row.zone && row.prestataire && row.typologie);
  }
}
