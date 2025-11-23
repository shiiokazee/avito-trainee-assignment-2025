import {
  Box,
  Button,
  MenuItem,
  Modal,
  TextField,
  Typography,
  type SxProps,
} from '@mui/material';
import type { AdActionParams, AdActionType } from './types';

type RejectAdModalProps = {
  actionType: AdActionType | undefined;
  loading: boolean;
  open: boolean;
  onSubmit: (values: FormValues) => Promise<void>;
  onClose: VoidFunction;
};

const modalStyle: SxProps = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
};

export const ConfirmAdActionModal: React.FC<RejectAdModalProps> = ({
  actionType,
  open,
  loading,
  onSubmit,
  onClose,
}) => {
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const values = Object.fromEntries(formData) as FormValues;

    await onSubmit(values);

    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <Box sx={modalStyle}>
          <Typography variant="h4">
            {actionType === 'reject'
              ? 'Отклонение объявления'
              : 'Запрос доработок'}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField required select fullWidth label="Причина" name="reason">
              {REASONS.map((reason) => (
                <MenuItem key={reason} value={reason}>
                  {reason}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              multiline
              name="comment"
              minRows={3}
              label="Комментарий"
            />
          </Box>

          <Box sx={{ display: 'flex', flexFlow: 'row nowrap', gap: 2 }}>
            <Button type="submit" loading={loading} variant="contained">
              Сохранить
            </Button>
            <Button onClick={onClose} loading={loading}>
              Отменить
            </Button>
          </Box>
        </Box>
      </form>
    </Modal>
  );
};

type FormValues = {
  reason: AdActionParams['reason'];
  comment?: string;
};

const REASONS: AdActionParams['reason'][] = [
  'Запрещенный товар',
  'Неверная категория',
  'Некорректное описание',
  'Подозрение на мошенничество',
  'Проблемы с фото',
  'Другое',
];
