import { Component } from '@angular/core';
import { MatExpansionPanel, MatExpansionPanelDescription, MatExpansionPanelHeader, MatExpansionPanelTitle } from '@angular/material/expansion';

@Component({
  selector: 'app-expansion-panel',
  templateUrl: './expansion-panel.component.html',
  styleUrl: './expansion-panel.component.scss',
  standalone: true,
  imports: [MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelDescription, MatExpansionPanelTitle]
})
export class ExpansionPanelComponent {

}
