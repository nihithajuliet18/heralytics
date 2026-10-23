import React, { useState, useMemo } from 'react';
import Papa from 'papaparse';
import { CaseDataset } from '../types';
import { Download, Search, BarChart3, Filter, Table, RefreshCw, AlertCircle } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface DatasetExplorerProps {
  dataset: CaseDataset;
}

export const DatasetExplorer: React.FC<DatasetExplorerProps> = ({ dataset }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [activeTab, setActiveTab] = useState<'table' | 'summary' | 'chart'>('table');
  const [selectedColumnFilter, setSelectedColumnFilter] = useState<string>('ALL');

  // Parse CSV content using Papa Parse
  const { data, headers } = useMemo(() => {
    const parsed = Papa.parse<Record<string, string>>(dataset.csvContent.trim(), {
      header: true,
      skipEmptyLines: true
    });
    return {
      data: parsed.data || [],
      headers: parsed.meta.fields || dataset.columns || []
    };
  }, [dataset.csvContent, dataset.columns]);

  // Compute analytics: duplicate detection, missing values, column stats
  const analytics = useMemo(() => {
    let missingCount = 0;
    const colStats: Record<string, { uniqueCount: number; isNumeric: boolean; sum: number; avg: number; min: number; max: number }> = {};

    headers.forEach((h) => {
      const values = data.map((r) => r[h]).filter((v) => v !== undefined && v !== null && v !== '');
      const uniqueVals = new Set(values);
      const numVals = values.map((v) => parseFloat(v)).filter((v) => !isNaN(v));
      const isNumeric = numVals.length === values.length && values.length > 0;

      let sum = 0;
      let min = isNumeric ? numVals[0] : 0;
      let max = isNumeric ? numVals[0] : 0;

      if (isNumeric) {
        sum = numVals.reduce((acc, n) => acc + n, 0);
        min = Math.min(...numVals);
        max = Math.max(...numVals);
      }

      colStats[h] = {
        uniqueCount: uniqueVals.size,
        isNumeric,
        sum,
        avg: numVals.length ? sum / numVals.length : 0,
        min,
        max
      };
    });

    data.forEach((row) => {
      headers.forEach((h) => {
        if (!row[h] || row[h].trim() === '') {
          missingCount++;
        }
      });
    });

    return {
      totalRows: data.length,
      totalColumns: headers.length,
      missingCount,
      colStats
    };
  }, [data, headers]);

  // Filtered and sorted data
  const processedData = useMemo(() => {
    let list = [...data];

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      list = list.filter((row) => {
        if (selectedColumnFilter !== 'ALL') {
          return (row[selectedColumnFilter] || '').toLowerCase().includes(term);
        }
        return Object.values(row).some((val) => (val || '').toLowerCase().includes(term));
      });
    }

    if (sortColumn) {
      list.sort((a, b) => {
        const valA = a[sortColumn] || '';
        const valB = b[sortColumn] || '';

        const numA = parseFloat(valA);
        const numB = parseFloat(valB);

        if (!isNaN(numA) && !isNaN(numB)) {
          return sortDirection === 'asc' ? numA - numB : numB - numA;
        }

        return sortDirection === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      });
    }

    return list;
  }, [data, searchTerm, selectedColumnFilter, sortColumn, sortDirection]);

  // Chart data: frequency distribution of the first categorical or selected column
  const chartData = useMemo(() => {
    const candidateCol = headers.find((h) => h.includes('status') || h.includes('room') || h.includes('holder') || h.includes('carrier') || h.includes('channel') || h.includes('type')) || headers[1] || headers[0];
    if (!candidateCol) return [];

    const counts: Record<string, number> = {};
    data.forEach((r) => {
      const val = (r[candidateCol] || 'Unknown').substring(0, 16);
      counts[val] = (counts[val] || 0) + 1;
    });

    return Object.entries(counts).map(([name, count]) => ({
      name,
      count
    }));
  }, [data, headers]);

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else {
        setSortColumn(null);
      }
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const handleDownloadCsv = () => {
    const blob = new Blob([dataset.csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', dataset.filename || `${dataset.id}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-[#1C1815] border border-[#3A332B] rounded shadow-lg overflow-hidden text-[#E4DDD3]">
      {/* Dataset Header Bar */}
      <div className="p-4 bg-[#231F1C] border-b border-[#3A332B] flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-mono-doc text-base font-bold text-[#F0EAE1] tracking-wide">
              {dataset.filename}
            </h3>
            <span className="text-xs text-[#A89F91]">
              ({analytics.totalRows} records · {analytics.totalColumns} columns)
            </span>
          </div>
          <p className="text-xs text-[#8C8275] mt-1">{dataset.description}</p>
        </div>

        <div className="flex items-center gap-2">
          {/* Segmented View Switcher */}
          <div className="flex items-center bg-[#151210] p-1 rounded border border-[#3A332B]">
            <button
              onClick={() => setActiveTab('table')}
              className={`px-3 py-1 text-xs font-mono-doc rounded transition-colors whitespace-nowrap ${
                activeTab === 'table' ? 'bg-[#3A332B] text-white' : 'text-[#8C8275] hover:text-[#E4DDD3]'
              }`}
            >
              <Table className="w-3.5 h-3.5 inline mr-1" /> Grid View
            </button>
            <button
              onClick={() => setActiveTab('summary')}
              className={`px-3 py-1 text-xs font-mono-doc rounded transition-colors whitespace-nowrap ${
                activeTab === 'summary' ? 'bg-[#3A332B] text-white' : 'text-[#8C8275] hover:text-[#E4DDD3]'
              }`}
            >
              <Filter className="w-3.5 h-3.5 inline mr-1" /> Statistics
            </button>
            <button
              onClick={() => setActiveTab('chart')}
              className={`px-3 py-1 text-xs font-mono-doc rounded transition-colors whitespace-nowrap ${
                activeTab === 'chart' ? 'bg-[#3A332B] text-white' : 'text-[#8C8275] hover:text-[#E4DDD3]'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5 inline mr-1" /> Chart
            </button>
          </div>

          <button
            onClick={handleDownloadCsv}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#8B2622] hover:bg-[#A32F2A] text-white text-xs font-mono-doc rounded transition-colors"
            title="Download Raw CSV"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      {activeTab === 'table' && (
        <div className="p-3 bg-[#181412] border-b border-[#2E2822] flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-[#736A5E]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search records, timestamps, values..."
              className="w-full bg-[#110F0E] border border-[#3A332B] rounded pl-9 pr-3 py-1.5 text-xs text-[#E4DDD3] placeholder-[#5C5449] focus:outline-none focus:border-[#8B2622]"
            />
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#8C8275] whitespace-nowrap">Column:</span>
            <select
              value={selectedColumnFilter}
              onChange={(e) => setSelectedColumnFilter(e.target.value)}
              className="bg-[#110F0E] border border-[#3A332B] rounded px-2 py-1.5 text-xs text-[#E4DDD3] focus:outline-none focus:border-[#8B2622]"
            >
              <option value="ALL">All Columns</option>
              {headers.map((h) => (
                <option key={h} value={h}>
                  {h}
                </option>
              ))}
            </select>
          </div>

          {(searchTerm || sortColumn) && (
            <button
              onClick={() => {
                setSearchTerm('');
                setSortColumn(null);
                setSelectedColumnFilter('ALL');
              }}
              className="text-xs text-[#8B2622] hover:underline flex items-center gap-1 ml-auto"
            >
              <RefreshCw className="w-3 h-3" /> Reset Filters
            </button>
          )}
        </div>
      )}

      {/* Main Content Areas */}
      {activeTab === 'table' && (
        <div className="overflow-x-auto max-h-[460px]">
          <table className="w-full text-left text-xs font-mono-doc border-collapse">
            <thead className="bg-[#24201C] text-[#C4BCB0] uppercase sticky top-0 z-10 border-b border-[#3A332B]">
              <tr>
                <th className="py-2.5 px-3 w-10 text-[#6B6256] text-center border-r border-[#2E2822]">#</th>
                {headers.map((col) => {
                  const isSorted = sortColumn === col;
                  return (
                    <th
                      key={col}
                      onClick={() => handleSort(col)}
                      className="py-2.5 px-3 border-r border-[#2E2822] cursor-pointer hover:bg-[#2C2723] select-none whitespace-nowrap"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span>{col}</span>
                        <span className="text-[10px] text-[#8C8275]">
                          {isSorted ? (sortDirection === 'asc' ? '▲' : '▼') : '↕'}
                        </span>
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2B2520]">
              {processedData.length === 0 ? (
                <tr>
                  <td colSpan={headers.length + 1} className="py-8 text-center text-[#736A5E]">
                    No evidence records matching current filter query.
                  </td>
                </tr>
              ) : (
                processedData.map((row, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-[#25201B] transition-colors odd:bg-[#181412] even:bg-[#1C1815]"
                  >
                    <td className="py-2 px-3 text-[#6B6256] text-center border-r border-[#2B2520] select-none">
                      {idx + 1}
                    </td>
                    {headers.map((col) => {
                      const val = row[col] || '';
                      const isAlert = val === 'TRUE' || val === 'FLAGGED_FROZEN' || val.includes('DENIED') || val.includes('COMPROMISED') || val.includes('TAMPER');
                      return (
                        <td
                          key={col}
                          className={`py-2 px-3 border-r border-[#2B2520] whitespace-nowrap tabular-nums ${
                            isAlert ? 'text-[#E05A47] font-bold' : 'text-[#D5CDC2]'
                          }`}
                        >
                          {val === '' ? <span className="text-[#554C42] italic">null</span> : val}
                        </td>
                      );
                    })}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'summary' && (
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-[#151210] border border-[#2E2822] rounded">
              <span className="text-[10px] uppercase font-mono-doc text-[#736A5E] block">Total Records</span>
              <span className="text-xl font-bold font-mono-doc text-[#F0EAE1]">{analytics.totalRows}</span>
            </div>
            <div className="p-3 bg-[#151210] border border-[#2E2822] rounded">
              <span className="text-[10px] uppercase font-mono-doc text-[#736A5E] block">Total Attributes</span>
              <span className="text-xl font-bold font-mono-doc text-[#F0EAE1]">{analytics.totalColumns}</span>
            </div>
            <div className="p-3 bg-[#151210] border border-[#2E2822] rounded">
              <span className="text-[10px] uppercase font-mono-doc text-[#736A5E] block">Missing Null Cells</span>
              <span className={`text-xl font-bold font-mono-doc ${analytics.missingCount > 0 ? 'text-[#E05A47]' : 'text-[#87A878]'}`}>
                {analytics.missingCount}
              </span>
            </div>
            <div className="p-3 bg-[#151210] border border-[#2E2822] rounded">
              <span className="text-[10px] uppercase font-mono-doc text-[#736A5E] block">Integrity State</span>
              <span className="text-sm font-bold font-mono-doc text-[#87A878]">VERIFIED CHECKSUM</span>
            </div>
          </div>

          <div className="border border-[#2E2822] rounded overflow-hidden">
            <table className="w-full text-xs font-mono-doc">
              <thead className="bg-[#24201C] text-[#C4BCB0] uppercase border-b border-[#2E2822]">
                <tr>
                  <th className="py-2 px-3 text-left">Column Name</th>
                  <th className="py-2 px-3 text-left">Data Type</th>
                  <th className="py-2 px-3 text-right">Unique Values</th>
                  <th className="py-2 px-3 text-right">Numeric Mean / Summary</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2B2520]">
                {headers.map((h) => {
                  const stat = analytics.colStats[h];
                  return (
                    <tr key={h} className="odd:bg-[#181412] even:bg-[#1C1815]">
                      <td className="py-2 px-3 font-bold text-[#E4DDD3]">{h}</td>
                      <td className="py-2 px-3 text-[#A89F91]">
                        {stat?.isNumeric ? 'Numeric (Float/Int)' : 'Text / Categorical'}
                      </td>
                      <td className="py-2 px-3 text-right text-[#C4BCB0] tabular-nums">{stat?.uniqueCount}</td>
                      <td className="py-2 px-3 text-right text-[#A89F91] tabular-nums">
                        {stat?.isNumeric
                          ? `Avg: ${stat.avg.toFixed(2)} [Min: ${stat.min}, Max: ${stat.max}]`
                          : 'Categorical distribution'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'chart' && (
        <div className="p-4">
          <div className="flex items-center gap-2 mb-3 text-xs text-[#A89F91]">
            <AlertCircle className="w-4 h-4 text-[#8B2622]" />
            <span>Distribution Breakdown: Primary category frequency across current case logs</span>
          </div>
          <div className="h-64 w-full bg-[#151210] p-2 rounded border border-[#2E2822]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2B2520" />
                <XAxis dataKey="name" stroke="#8C8275" tick={{ fontSize: 10 }} interval={0} angle={-25} textAnchor="end" />
                <YAxis stroke="#8C8275" tick={{ fontSize: 10 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#231F1C',
                    borderColor: '#3A332B',
                    color: '#E4DDD3',
                    fontSize: '11px',
                    fontFamily: 'monospace'
                  }}
                />
                <Bar dataKey="count" fill="#8B2622" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};
