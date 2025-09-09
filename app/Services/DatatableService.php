<?php

namespace App\Services;

use App\Http\Requests\DatatableRequest;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;

class DatatableService {
    public Builder $query;
    public array $sorting, $filters;
    public int $per_page;

    public function __construct(DatatableRequest $request, string $model) {
        $validated = $request->validated();

        $this->sorting = [
            'column' => $validated['sort'] ?? 'id',
            'direction' => $validated['direction'] ?? 'asc',
        ];
        $this->filters = $validated['filters'] ?? [];
        $this->per_page = $validated['per_page'] ?? 10;
        $this->query =  $model::query();
    }

    public function sort(): self {
        $this->query->orderBy($this->sorting['column'], $this->sorting['direction']);
        return $this;
    }

    public function paginate(): LengthAwarePaginator {
        return $this->query->paginate($this->per_page);
    }
}
