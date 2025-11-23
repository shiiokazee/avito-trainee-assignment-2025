import { Grid, Paper } from '@mui/material';
import {
  ActivityChart,
  CategoriesChart,
  DecisionsChart,
  Summary,
} from './components';

export const StatsPage: React.FC = () => {
  return (
    <Grid container spacing={2}>
      <Grid size={{ md: 12, lg: 6 }}>
        <Paper sx={{ p: 2, height: 400 }}>
          <Summary />
        </Paper>
      </Grid>
      <Grid size={{ md: 12, lg: 6 }}>
        <Paper sx={{ p: 2, height: 400 }}>
          <ActivityChart />
        </Paper>
      </Grid>
      <Grid size={{ md: 12, lg: 6 }}>
        <Paper sx={{ p: 2, height: 400 }}>
          <DecisionsChart />
        </Paper>
      </Grid>
      <Grid size={{ md: 12, lg: 6 }}>
        <Paper sx={{ p: 2, height: 400 }}>
          <CategoriesChart />
        </Paper>
      </Grid>
    </Grid>
  );
};
