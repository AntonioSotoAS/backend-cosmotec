import { Controller, Get, Query, Res, HttpStatus } from '@nestjs/common';
import type { Response } from 'express';
import { AstronautsService } from './astronauts.service';

@Controller('astronauts/reports')
export class ReportsController {
  constructor(private readonly astronautsService: AstronautsService) {}

  // Endpoint para generar reporte CSV de todos los astronautas por fecha
  @Get('csv')
  async generateCsvReport(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @Query('format') format: string = 'csv',
    @Res() res: Response
  ) {
    try {
      const reportData = await this.astronautsService.generateReportData(startDate, endDate);
      
      if (format === 'csv') {
        const csvContent = this.convertToCSV(reportData);
        
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', `attachment; filename="astronautas-reporte-${startDate}-${endDate}.csv"`);
        res.status(HttpStatus.OK).send(csvContent);
      } else {
        res.status(HttpStatus.OK).json({
          success: true,
          data: reportData,
          totalRecords: reportData.length,
          dateRange: { startDate, endDate }
        });
      }
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        error: error.message
      });
    }
  }

  // Endpoint para generar reporte JSON de todos los astronautas por fecha
  @Get('json')
  async generateJsonReport(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @Res() res: Response
  ) {
    try {
      const reportData = await this.astronautsService.generateReportData(startDate, endDate);
      
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Content-Disposition', `attachment; filename="astronautas-reporte-${startDate}-${endDate}.json"`);
      res.status(HttpStatus.OK).json({
        success: true,
        reportInfo: {
          generatedAt: new Date().toISOString(),
          dateRange: { startDate, endDate },
          totalRecords: reportData.length
        },
        data: reportData
      });
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        error: error.message
      });
    }
  }

  // Endpoint para obtener resumen estadístico por fecha
  @Get('summary')
  async getReportSummary(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string
  ) {
    return this.astronautsService.getReportSummary(startDate, endDate);
  }

  // Método privado para convertir datos a CSV
  private convertToCSV(data: any[]): string {
    if (!data || data.length === 0) {
      return 'No hay datos para el rango de fechas especificado';
    }

    // Obtener todas las claves de los objetos
    const headers = Object.keys(data[0]);
    
    // Crear fila de encabezados
    const csvHeaders = headers.join(',');
    
    // Crear filas de datos
    const csvRows = data.map(row => {
      return headers.map(header => {
        const value = row[header];
        // Escapar comillas y envolver en comillas si contiene comas
        if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      }).join(',');
    });

    return [csvHeaders, ...csvRows].join('\n');
  }
}
