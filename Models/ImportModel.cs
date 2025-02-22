﻿namespace CarCareTracker.Models
{
    /// <summary>
    /// Import model used for importing Gas records.
    /// </summary>
    public class ImportModel
    {
        public string Date { get; set; }
        public string Odometer { get; set; }
        public string Description { get; set; }
        public string Notes { get; set; }
        public string FuelConsumed { get; set; }
        public string Cost { get; set; }
        public string Price { get; set; }
        public string PartialFuelUp { get; set; }
        public string IsFillToFull { get; set; }
    }
    public class ServiceRecordExportModel
    {
        public string Date { get; set; }
        public string Odometer { get; set; }
        public string Description { get; set; }
        public string Notes { get; set; }
        public string Cost { get; set; }
    }
    public class GasRecordExportModel
    {
        public string Date { get; set; }
        public string Odometer { get; set; }
        public string FuelConsumed { get; set; }
        public string Cost { get; set; }
        public string FuelEconomy { get; set; }
    }
    public class ReminderExportModel
    {
        public string Description { get; set; }
        public string Urgency { get; set; }
        public string Metric { get; set; }
        public string Notes { get; set; }
    }
}
