using Microsoft.AspNetCore.Mvc;
using SmartSchool_WebAPI.Data;
using SmartSchool_WebAPI.Models;

namespace SmartSchool_WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AlunoController : ControllerBase
    {
        private readonly IRepository _repository;


        public AlunoController(IRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var result = await _repository.GetAllAlunosAsync(true);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest($"Erro: {ex.Message}");
            }
        }

        [HttpGet("{AlunoId}")]
        public async Task<IActionResult> GetByAlunoId(int AlunoId)
        {
            try
            {
                var result = await _repository.GetAlunoAsyncById(AlunoId, true);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest($"Erro: {ex.Message}");
            }
        }

        [HttpGet("ByDisciplina/{disciplinaId}")]
        public async Task<IActionResult> GetByDisciplinaId(int disciplinaId)
        {
            try
            {
                var result = await _repository.GetAllAlunosAsyncByDisciplinaId(disciplinaId, false);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest($"Erro: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(Aluno model)
        {
            try
            {
                _repository.Add(model);

                if(await _repository.SaveChangesAsync())
                {
                    return Ok(model);
                }
            }
            catch (Exception ex)
            {
                return BadRequest($"Erro: {ex.Message}");
            }

            return BadRequest();
        }
        
        [HttpPut("{AlunoId}")]
        public async Task<IActionResult> Put(int AlunoId, Aluno model)
        {
            try
            {
                var aluno = await _repository.GetAlunoAsyncById(AlunoId, false);
                
                if(aluno == null) return NotFound("Aluno não encontrado");

                _repository.Update(model);

                if(await _repository.SaveChangesAsync())
                {
                    return Ok(model);
                }
            }
            catch (Exception ex)
            {
                return BadRequest($"Erro: {ex.Message}");
            }

            return BadRequest();
        }

        [HttpDelete("{AlunoId}")]
        public async Task<IActionResult> Delete(int AlunoId)
        {
            try
            {
                var aluno = await _repository.GetAlunoAsyncById(AlunoId, false);
                
                if(aluno == null) return NotFound();

                _repository.Delete(aluno);

                if(await _repository.SaveChangesAsync())
                {
                    return Ok(new { message = "Deletado" });
                }
            }
            catch (Exception ex)
            {
                return BadRequest($"Erro: {ex.Message}");
            }

            return BadRequest();
        }
    }
}