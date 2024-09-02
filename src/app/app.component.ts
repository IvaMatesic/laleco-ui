import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HeaderComponent} from './components/layout/header/header.component';
import {HomepageComponent} from './components/features/homepage/homepage.component';
import {NavigationComponent} from './components/layout/navigation/navigation.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, HomepageComponent, NavigationComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'laleco-ui';
}
