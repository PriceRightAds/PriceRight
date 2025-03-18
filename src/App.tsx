import React, { useState } from 'react';
import { 
    Container, 
    Typography, 
    Box, 
    TextField, 
    Button, 
    Grid,
    Paper,
    List,
    ListItem,
    IconButton,
    Divider,
    useTheme,
    useMediaQuery
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import { MovingCost, MovingItem } from './types';
import { calculateTotalCost, formatAmount } from './utils/calculator';

function App() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [cost, setCost] = useState<MovingCost>({
        movingFee: 0,
        stairsElevatorFee: 0,
        protectionPackagingFee: 0,
        disassemblyFee: 0,
        disposalFee: 0,
        cardboardBoxFee: 0,
        packingUnpackingFee: 0,
        holidayWeekendFee: 0,
        distanceFee: 0,
        additionalLocationFee: 0,
        parkingTunnelFee: 0
    });

    const [items, setItems] = useState<MovingItem[]>([]);

    const handleCostChange = (field: keyof MovingCost) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setCost({
            ...cost,
            [field]: parseFloat(event.target.value) || 0
        });
    };

    const addItem = () => {
        setItems([...items, { name: '', quantity: 1, unitPrice: 0 }]);
    };

    const removeItem = (index: number) => {
        setItems(items.filter((_, i) => i !== index));
    };

    const updateItem = (index: number, field: keyof MovingItem, value: string | number) => {
        const newItems = [...items];
        newItems[index] = { ...newItems[index], [field]: value };
        setItems(newItems);
    };

    const resetAll = () => {
        setCost({
            movingFee: 0,
            stairsElevatorFee: 0,
            protectionPackagingFee: 0,
            disassemblyFee: 0,
            disposalFee: 0,
            cardboardBoxFee: 0,
            packingUnpackingFee: 0,
            holidayWeekendFee: 0,
            distanceFee: 0,
            additionalLocationFee: 0,
            parkingTunnelFee: 0
        });
        setItems([]);
    };

    const totalCost = calculateTotalCost(cost);

    return (
        <Container maxWidth="md">
            <Box sx={{ my: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom align="center">
                    實惠搬屋有限公司 - 搬運費用計算器
                </Typography>

                <Paper sx={{ p: 3, mb: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h6">
                            搬運項目
                        </Typography>
                        <Button
                            startIcon={<RefreshIcon />}
                            onClick={resetAll}
                            variant="outlined"
                            color="error"
                        >
                            重置所有
                        </Button>
                    </Box>
                    <List>
                        {items.map((item, index) => (
                            <ListItem key={index} secondaryAction={
                                <IconButton edge="end" onClick={() => removeItem(index)}>
                                    <DeleteIcon />
                                </IconButton>
                            }>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            fullWidth
                                            label="項目名稱"
                                            value={item.name}
                                            onChange={(e) => updateItem(index, 'name', e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            fullWidth
                                            type="number"
                                            label="數量"
                                            value={item.quantity}
                                            onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value) || 0)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            fullWidth
                                            type="number"
                                            label="單價"
                                            value={item.unitPrice}
                                            onChange={(e) => updateItem(index, 'unitPrice', parseFloat(e.target.value) || 0)}
                                        />
                                    </Grid>
                                </Grid>
                            </ListItem>
                        ))}
                    </List>
                    <Button
                        startIcon={<AddIcon />}
                        onClick={addItem}
                        variant="outlined"
                        sx={{ mt: 2 }}
                    >
                        新增項目
                    </Button>
                </Paper>

                <Paper sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        費用明細
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="搬運費總計"
                                type="number"
                                value={cost.movingFee}
                                onChange={handleCostChange('movingFee')}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="行樓梯／轉電梯費"
                                type="number"
                                value={cost.stairsElevatorFee}
                                onChange={handleCostChange('stairsElevatorFee')}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="保護物料及包裝費"
                                type="number"
                                value={cost.protectionPackagingFee}
                                onChange={handleCostChange('protectionPackagingFee')}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="拆裝費總計"
                                type="number"
                                value={cost.disassemblyFee}
                                onChange={handleCostChange('disassemblyFee')}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="棄置費總計"
                                type="number"
                                value={cost.disposalFee}
                                onChange={handleCostChange('disposalFee')}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="訂購紙箱費"
                                type="number"
                                value={cost.cardboardBoxFee}
                                onChange={handleCostChange('cardboardBoxFee')}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="代客裝箱／拆箱服務費"
                                type="number"
                                value={cost.packingUnpackingFee}
                                onChange={handleCostChange('packingUnpackingFee')}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="公眾假期／星期六／日附加費"
                                type="number"
                                value={cost.holidayWeekendFee}
                                onChange={handleCostChange('holidayWeekendFee')}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="路程費"
                                type="number"
                                value={cost.distanceFee}
                                onChange={handleCostChange('distanceFee')}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="額外接收或運送地點附加費"
                                type="number"
                                value={cost.additionalLocationFee}
                                onChange={handleCostChange('additionalLocationFee')}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="停車場費及隧道費"
                                type="number"
                                value={cost.parkingTunnelFee}
                                onChange={handleCostChange('parkingTunnelFee')}
                            />
                        </Grid>
                    </Grid>

                    <Divider sx={{ my: 3 }} />

                    <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        flexDirection: isMobile ? 'column' : 'row',
                        gap: 2
                    }}>
                        <Box>
                            <Typography variant="subtitle1" color="text.secondary">
                                搬運費總計：{formatAmount(cost.movingFee)}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary">
                                行樓梯／轉電梯費：{formatAmount(cost.stairsElevatorFee)}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary">
                                保護物料及包裝費：{formatAmount(cost.protectionPackagingFee)}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary">
                                拆裝費總計：{formatAmount(cost.disassemblyFee)}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary">
                                棄置費總計：{formatAmount(cost.disposalFee)}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary">
                                訂購紙箱費：{formatAmount(cost.cardboardBoxFee)}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary">
                                代客裝箱／拆箱服務費：{formatAmount(cost.packingUnpackingFee)}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary">
                                公眾假期／星期六／日附加費：{formatAmount(cost.holidayWeekendFee)}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary">
                                路程費：{formatAmount(cost.distanceFee)}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary">
                                額外接收或運送地點附加費：{formatAmount(cost.additionalLocationFee)}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary">
                                停車場費及隧道費：{formatAmount(cost.parkingTunnelFee)}
                            </Typography>
                        </Box>
                        <Box sx={{ textAlign: isMobile ? 'center' : 'right' }}>
                            <Typography variant="h5" color="primary" sx={{ fontWeight: 'bold' }}>
                                總費用：{formatAmount(totalCost)}
                            </Typography>
                        </Box>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
}

export default App; 